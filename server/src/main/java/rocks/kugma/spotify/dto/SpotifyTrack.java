package rocks.kugma.spotify.dto;

import java.util.List;

public class SpotifyTrack {
    public String id;
    public String name;
    public String type;
    public String uri;
    public SpotifyAlbum album;
    public List<SpotifyArtist> artists;
}
