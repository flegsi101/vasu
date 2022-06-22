package rocks.kugma.spotify.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SpotifyUser {
    public String id;
    @JsonProperty("display_name")
    public String displayName;
}
