import { AlbumDto } from "@app/dto";
import {ListenmarkDto} from "@app/listenmarks/dto/listenmark.dto";

export interface ListenmarksSearchbarStateModel {
  query: string
  focused: boolean
}

export interface ListenmarksStateModel {
  searchbar: ListenmarksSearchbarStateModel
  searching: boolean
  listenmarks: ListenmarkDto[]
}
