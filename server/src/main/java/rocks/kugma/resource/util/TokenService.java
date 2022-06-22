package rocks.kugma.resource.util;

import io.smallrye.jwt.build.Jwt;

import java.time.Duration;
import java.util.Set;

public class TokenService {

    public static String generateAccessToken(String id) {
        return Jwt
                .issuer("vasu")
                .upn(id)
                .expiresIn(Duration.ofHours(1))
                .groups(Set.of("user"))
                .sign();
    }

    public static String generateRefreshToken(String id) {
        return Jwt
                .issuer("vasu")
                .upn(id)
                .expiresIn(Duration.ofDays(30))
                .groups(Set.of("user-refresh"))
                .sign();
    }
}
