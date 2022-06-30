package rocks.kugma.spotify;

import io.quarkus.rest.client.reactive.ClientExceptionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import rocks.kugma.spotify.dto.SpotifyUser;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.core.Response;

@ApplicationScoped
public class SpotifyUserService {
    @Inject
    @RestClient
    SpotifyUserProxy proxy;

    public SpotifyUser currentUser(String accessToken) {
        return proxy.currentUser("Bearer " + accessToken);
    }
}
