package rocks.kugma.spotify.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SpotifyAlbum {
    public String id;
    public String name;
    public String type;
    @JsonProperty("album_group")
    public String albumGroup;
}
