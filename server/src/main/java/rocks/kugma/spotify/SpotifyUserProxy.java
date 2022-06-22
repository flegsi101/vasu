package rocks.kugma.spotify;

import rocks.kugma.spotify.dto.SpotifyUser;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@RegisterRestClient(baseUri = "https://api.spotify.com/v1/me")
interface SpotifyUserProxy {

    @GET()
    @Produces(MediaType.APPLICATION_JSON)
    SpotifyUser currentUser(@HeaderParam("Authorization") String authHeader);
}
