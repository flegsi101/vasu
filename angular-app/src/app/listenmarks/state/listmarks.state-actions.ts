import { AlbumDto } from "@app/dto";
import {ListenmarkDto} from "@app/listenmarks/dto/listenmark.dto";

const type = (type: string) => `[LISTENMARKS] ${type}`

export class UpdateQuery {
  public static type = type('Update query')

  constructor(public query: string) {}
}

export class SetSearching {
  public static type = type('Set searching')

  constructor(public searching: boolean) {}
}

export class SetListenmarks {
  public static type = type('Set listenmarks')
  constructor(public listenmarks: ListenmarkDto[]) {}
}

export class AddListemark {
  public static type = type('Add')
  constructor(public listenmark: ListenmarkDto) {}
}

export class RemoveListenmark{
  public static type = type('Remove')
  constructor(public id: string) {}
}