import {ArtistDto} from './artist.dto';
import {ImageDto} from './image.dto';

export interface AlbumDto {
  id: string
  name: string
  artists: ArtistDto[]
  images: ImageDto[]
}
