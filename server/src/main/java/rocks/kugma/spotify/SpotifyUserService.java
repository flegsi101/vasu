package rocks.kugma.spotify;

import rocks.kugma.spotify.dto.SpotifyUser;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class SpotifyUserService {
    @Inject
    @RestClient
    SpotifyUserProxy proxy;

    public SpotifyUser currentUser(String accessToken) {
        return proxy.currentUser("Bearer " + accessToken);
    }
}
