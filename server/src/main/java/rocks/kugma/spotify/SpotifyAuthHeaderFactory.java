package rocks.kugma.spotify;

import org.eclipse.microprofile.rest.client.ext.ClientHeadersFactory;
import rocks.kugma.data.SpotifyCredentialsEntity;
import rocks.kugma.spotify.dto.SpotifyTokenResponse;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.core.MultivaluedMap;
import java.util.Calendar;
import java.util.Date;

@ApplicationScoped
public class SpotifyAuthHeaderFactory implements ClientHeadersFactory {

    @Inject
    SpotifyTokenService tokenService;

    @Override
    public MultivaluedMap<String, String> update(MultivaluedMap<String, String> incomingHeaders, MultivaluedMap<String, String> clientOutgoingHeaders) {
        String accessToken = clientOutgoingHeaders.get("Authorization").get(0).replace("Bearer ", "");
        SpotifyCredentialsEntity creds = SpotifyCredentialsEntity.find("accessToken", accessToken).firstResult();
        if (creds.expiresAt.before(new Date())) {
            SpotifyTokenResponse tokenResponse = tokenService.refreshTokens(creds.refreshToken);
            creds.accessToken = tokenResponse.getAccessToken();
            creds.refreshToken = tokenResponse.getRefreshToken();
            Calendar expiration = Calendar.getInstance();
            expiration.setTime(new Date());
            expiration.add(Calendar.SECOND, tokenResponse.getExpiresIn() - 10);
            creds.expiresAt = expiration.getTime();
            creds.persist();
            clientOutgoingHeaders.get("Authorization").set(0, "Bearer " + creds.accessToken);
        }

        return clientOutgoingHeaders;
    }
}
