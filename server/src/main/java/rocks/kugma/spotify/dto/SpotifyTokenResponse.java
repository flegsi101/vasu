package rocks.kugma.spotify.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.Builder;
import lombok.Value;

@JsonDeserialize(builder = SpotifyTokenResponse.SpotifyTokenResponseBuilder.class)
@Value
@Builder
public class SpotifyTokenResponse {
    @JsonProperty("access_token")
    String accessToken;
    @JsonProperty("refresh_token")
    String refreshToken;
    @JsonProperty("expires_in")
    int expiresIn;

    @JsonPOJOBuilder()
    public static class SpotifyTokenResponseBuilder {
    }
}
