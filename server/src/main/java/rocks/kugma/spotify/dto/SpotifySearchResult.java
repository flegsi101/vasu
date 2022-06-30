package rocks.kugma.spotify.dto;

import java.util.List;

public class SpotifySearchResult {
    public SpotifySearchResultItem<SpotifyTrack> tracks;
    public SpotifySearchResultItem<SpotifyArtist> artists;
    public SpotifySearchResultItem<SpotifyAlbum> albums;
}
