package rocks.kugma.spotify;

import io.quarkus.rest.client.reactive.ClientExceptionMapper;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import rocks.kugma.spotify.dto.SpotifyRecentlyPlayed;
import rocks.kugma.spotify.dto.SpotifyTrack;

import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@RegisterRestClient(baseUri = "https://api.spotify.com/v1/me/player/recently-played")
interface SpotifyRecentlyPlayedProxy {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    SpotifyRecentlyPlayedResponseWrapper getRecentlyPlayed(@HeaderParam("Authorization") String authHeader,
                                            @QueryParam("limit") int limit);

    @ClientExceptionMapper
    static RuntimeException toException(Response response) {
        Logger logger = LoggerFactory.getLogger(SpotifyRecentlyPlayedProxy.class.getSimpleName());
        logger.error(response.getEntity().toString());
        return null;
    }

    class SpotifyRecentlyPlayedResponseWrapper {
        public List<SpotifyRecentlyPlayed> items;
    }
}
