package rocks.kugma.listenmarks;

import org.eclipse.microprofile.jwt.JsonWebToken;
import rocks.kugma.data.SpotifyCredentialsEntity;
import rocks.kugma.listenmarks.dto.SearchDto;
import rocks.kugma.spotify.SpotifySearchService;
import rocks.kugma.spotify.dto.SpotifyAlbum;
import rocks.kugma.spotify.dto.SpotifySearchResult;
import rocks.kugma.spotify.dto.SpotifySearchResultItem;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/api/v1/listenmarks")
@RequestScoped
public class ListenmarksResource {

    @Inject
    JsonWebToken jwt;
    @Inject
    SpotifySearchService searchService;

    @POST
    @Path("/search")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"user"})
    public Response search(SearchDto search) {
        SpotifyCredentialsEntity creds = SpotifyCredentialsEntity.findById(jwt.getName());
        SpotifySearchResultItem<SpotifyAlbum> result = searchService.searchAlbums(creds.accessToken, search.query);
        return Response.ok()
                .entity(result)
                .build();
    }
}
