package rocks.kugma.resource.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RefreshResponse {
    private String userId;
    private String accessToken;
    private String refreshToken;
}
