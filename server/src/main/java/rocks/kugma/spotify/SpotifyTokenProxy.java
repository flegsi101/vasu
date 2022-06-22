package rocks.kugma.spotify;

import rocks.kugma.spotify.dto.SpotifyTokenResponse;
import org.eclipse.microprofile.config.ConfigProvider;
import org.eclipse.microprofile.rest.client.annotation.ClientHeaderParam;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@RegisterRestClient(baseUri = "https://accounts.spotify.com/api/token")
@ClientHeaderParam(name = "Authorization", value = "{spotifyAuth}")
interface SpotifyTokenProxy {

    @SuppressWarnings("unused")
    default String spotifyAuth() {
        String id = ConfigProvider.getConfig().getValue("VASU.SPOTIFY.CLIENTID", String.class);
        String secret = ConfigProvider.getConfig().getValue("VASU.SPOTIFY.CLIENTSECRET", String.class);
        return "Basic " + Base64.getEncoder().encodeToString((id + ":" + secret).getBytes(StandardCharsets.UTF_8));
    }

    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    SpotifyTokenResponse requestTokens(@FormParam("grant_type") String grantType, @FormParam("code") String code, @FormParam("redirect_uri") String redirectUri);
}
