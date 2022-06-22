package rocks.kugma.resource.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String userName;
    private String userId;
    private String accessToken;
    private String refreshToken;
}
