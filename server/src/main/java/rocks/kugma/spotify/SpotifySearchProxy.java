package rocks.kugma.spotify;

import io.quarkus.rest.client.reactive.ClientExceptionMapper;
import org.eclipse.microprofile.rest.client.annotation.RegisterClientHeaders;
import org.eclipse.microprofile.rest.client.annotation.RegisterProvider;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import rocks.kugma.spotify.dto.*;

import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@RegisterRestClient(baseUri = "https://api.spotify.com/v1/search")
@RegisterClientHeaders(SpotifyAuthHeaderFactory.class)
interface SpotifySearchProxy {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    SpotifySearchResult search(
            @HeaderParam("Authorization") String accessToken,
            @QueryParam("q") String q,
            @QueryParam("type") String type);

    @ClientExceptionMapper
    static RuntimeException toException(Response response) {
        Logger logger = LoggerFactory.getLogger(SpotifySearchProxy.class.getSimpleName());
        logger.error(response.getEntity().toString());
        return null;
    }
}
