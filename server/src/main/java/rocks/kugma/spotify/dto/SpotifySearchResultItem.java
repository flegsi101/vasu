package rocks.kugma.spotify.dto;

import java.util.List;

public class SpotifySearchResultItem<T> {
    public String href;
    public List<T> items;
    public int limit;
    public String next;
    public int offset;
    public String previous;
    public int total;
}
