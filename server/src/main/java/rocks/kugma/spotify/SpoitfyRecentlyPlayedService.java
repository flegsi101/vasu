package rocks.kugma.spotify;

import org.eclipse.microprofile.rest.client.inject.RestClient;
import rocks.kugma.spotify.dto.SpotifyRecentlyPlayed;
import rocks.kugma.spotify.dto.SpotifyTrack;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

@ApplicationScoped
public class SpoitfyRecentlyPlayedService {

    @Inject
    @RestClient
    SpotifyRecentlyPlayedProxy recentlyPlayedProxy;

    public List<SpotifyRecentlyPlayed> getRecentlyPlayed(String accessToken) {
        SpotifyRecentlyPlayedProxy.SpotifyRecentlyPlayedResponseWrapper response = recentlyPlayedProxy.getRecentlyPlayed(accessToken, 50);
        return response.items;
    }
}
