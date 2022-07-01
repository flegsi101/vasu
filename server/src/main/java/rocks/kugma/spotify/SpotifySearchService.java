package rocks.kugma.spotify;

import org.eclipse.microprofile.rest.client.inject.RestClient;
import rocks.kugma.spotify.dto.SpotifyAlbum;
import rocks.kugma.spotify.dto.SpotifySearchResult;
import rocks.kugma.spotify.dto.SpotifySearchResultItem;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

@ApplicationScoped
public class SpotifySearchService {

    @Inject
    @RestClient
    SpotifySearchProxy proxy;

    public SpotifySearchResultItem<SpotifyAlbum> searchAlbums(String accessToken, String query) {
        SpotifySearchResult result = proxy.search("Bearer " + accessToken, query,"album");
        return result.albums;
    }
}
