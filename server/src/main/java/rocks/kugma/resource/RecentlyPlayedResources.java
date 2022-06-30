package rocks.kugma.resource;

import org.eclipse.microprofile.jwt.JsonWebToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import rocks.kugma.data.SpotifyCredentialsEntity;
import rocks.kugma.spotify.SpoitfyRecentlyPlayedService;
import rocks.kugma.spotify.dto.SpotifyRecentlyPlayed;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;

@Path("/recentlyPlayed")
@RequestScoped
public class RecentlyPlayedResources {

    private final Logger logger = LoggerFactory.getLogger(RecentlyPlayedResources.class.getSimpleName());

    @Inject
    JsonWebToken jwt;

    @Inject
    SpoitfyRecentlyPlayedService recentlyPlayedService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRecentlyPlayed() {
        SpotifyCredentialsEntity user = SpotifyCredentialsEntity.findById(jwt.getName());
        List<SpotifyRecentlyPlayed> list = recentlyPlayedService.getRecentlyPlayed("Bearer " + user.accessToken);
        return Response.ok().entity(list.stream().map(e -> e.track).collect(Collectors.toList())).build();
    }

}
