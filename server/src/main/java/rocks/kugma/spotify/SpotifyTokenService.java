package rocks.kugma.spotify;

import rocks.kugma.spotify.dto.SpotifyTokenResponse;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class SpotifyTokenService {

    private static class GrantType {
        static final String AUTHORIZATION_CODE = "authorization_code";
    }

    @Inject
    @RestClient
    SpotifyTokenProxy proxy;

    public SpotifyTokenResponse requestTokens(String code, String redirectUri) {
        return proxy.requestTokens(GrantType.AUTHORIZATION_CODE, code, redirectUri);
    }
}
