package rocks.kugma.listenmarks.dto;

import lombok.Builder;

import java.util.List;

@Builder
public class ListenmarkDto {
    public String id;
    public String name;
    public List<String> artists;
    public String imageUri;
}
