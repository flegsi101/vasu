package rocks.kugma.resource;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import rocks.kugma.data.RefreshTokenEntity;
import rocks.kugma.data.SpotifyCredentialsEntity;
import rocks.kugma.resource.dto.AuthResponse;
import rocks.kugma.resource.util.TokenService;
import rocks.kugma.spotify.SpotifyTokenService;
import rocks.kugma.spotify.SpotifyUserService;
import rocks.kugma.spotify.dto.SpotifyTokenResponse;
import rocks.kugma.spotify.dto.SpotifyUser;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Calendar;
import java.util.Date;

@Path("/auth")
@RequestScoped()
public class AuthResource {

    @ConfigProperty(name = "VASU.SPOTIFY.CLIENTID")
    String spotifyClientId;

    private final Logger logger = LoggerFactory.getLogger(AuthResource.class.getSimpleName());

    @Inject
    SpotifyTokenService spotifyTokenService;

    @Inject
    SpotifyUserService spotifyUserService;

    @Inject
    JsonWebToken jwt;

    final String scopes = "playlist-read-private%20playlist-modify-private%20playlist-modify-public%20playlist-read-collaborative%20user-library-read%20user-library-modify%20user-read-recently-played";

    @Path("/url")
    @GET()
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAuthUrl(@QueryParam("redirectUri") String redirectUri) {
        String res = "{ \"url\": \"https://accounts.spotify.com/authorize?"
                + "response_type=code&client_id=" + spotifyClientId
                + "&redirect_uri=" + redirectUri
                + "&scope=" + scopes + "\"}";
        return Response.ok(res).build();
    }

    @GET()
    @Path("/token")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public AuthResponse login(@QueryParam("code") String code, @QueryParam("redirectUri") String redirectUri) {
        SpotifyTokenResponse tokenResponse = spotifyTokenService.requestTokens(code, redirectUri);
        SpotifyUser user = spotifyUserService.currentUser(tokenResponse.getAccessToken());

        SpotifyCredentialsEntity credentials = SpotifyCredentialsEntity.findById(user.id);
        if (credentials == null) {
            credentials = new SpotifyCredentialsEntity();
            credentials.id = user.id;
        }
        credentials.accessToken = tokenResponse.getAccessToken();
        credentials.refreshToken = tokenResponse.getRefreshToken();
        Calendar expiration = Calendar.getInstance();
        expiration.setTime(new Date());
        expiration.add(Calendar.SECOND, tokenResponse.getExpiresIn() - 10);
        credentials.expiresAt = expiration.getTime();

        credentials.persist();

        String accessToken = TokenService.generateAccessToken(credentials.id, user.displayName);
        String refreshToken = TokenService.generateRefreshToken(credentials.id, user.displayName);

        RefreshTokenEntity refreshTokenEntity = new RefreshTokenEntity(refreshToken.hashCode(), credentials.id, false);
        refreshTokenEntity.persist();

        return new AuthResponse(user.displayName, user.id, accessToken, refreshToken);
    }

    @GET()
    @Path("/refresh")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response refreshToken() {
        String token = jwt.getRawToken();
        int tokenCode = token.hashCode();

        RefreshTokenEntity entry = RefreshTokenEntity.findByHashCode(tokenCode);

        if (entry == null) {
            return Response.status(401).entity("Invalid refresh token").build();
        }

        if (entry.isUsed()) {
            long deleted = RefreshTokenEntity.deleteByUser(entry.getUserId());
            logger.info("Deleted " + deleted + " refreshToken entries of repeated use");
            return Response.status(401).entity("Token already used").build();
        }

        String accessToken = TokenService.generateAccessToken(entry.getUserId(), jwt.getClaim("username"));
        String refreshToken = TokenService.generateRefreshToken(entry.getUserId(), jwt.getClaim("username"));

        RefreshTokenEntity newEntry = new RefreshTokenEntity(refreshToken.hashCode(), entry.getUserId(), false);
        newEntry.persist();

        entry.setUsed(true);
        entry.persist();


        return Response.ok().entity(new AuthResponse( jwt.getClaim("username"), newEntry.getUserId(), accessToken, refreshToken)).build();
    }
}
