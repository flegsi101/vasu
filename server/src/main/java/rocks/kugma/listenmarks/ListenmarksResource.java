package rocks.kugma.listenmarks;

import org.eclipse.microprofile.jwt.JsonWebToken;
import rocks.kugma.data.SpotifyCredentialsEntity;
import rocks.kugma.listenmarks.dto.ListenmarkDto;
import rocks.kugma.listenmarks.dto.SearchDto;
import rocks.kugma.spotify.SpotifySearchService;
import rocks.kugma.spotify.dto.SpotifyAlbum;
import rocks.kugma.spotify.dto.SpotifySearchResultItem;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;

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

    @GET
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("user")
    public Response all(ListenmarkDto dto) {
        String user = jwt.getName();
        List<ListenmarkDto> entites = ListenmarkEntity.findByUser(user).stream()
                .map(e -> ListenmarkDto.builder()
                        .id(e.id)
                        .name(e.name)
                        .imageUri(e.imageUri)
                        .artists(List.of(e.artists.split(",")))
                        .build())
                .collect(Collectors.toList());
        return Response.ok().entity(entites).build();
    }

    @POST
    @Path("add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("user")
    @Transactional
    public Response add(ListenmarkDto dto) {
        String user = jwt.getName();
        ListenmarkEntity entity = new ListenmarkEntity(dto.id, user, dto.name, dto.imageUri, String.join(",", dto.artists));
        entity.persist();
        return Response.ok().entity(entity).build();
    }

    @DELETE
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("user")
    @Transactional
    public Response remove(@PathParam("id") String id) {
        String user = jwt.getName();
        ListenmarkEntity.deleteByIdAndUser(id, user);
        return Response.ok().build();
    }
}
