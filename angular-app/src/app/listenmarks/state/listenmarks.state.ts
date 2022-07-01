import { ListenmarksStateModel } from './listenmarks.state-model'
import { Action, Selector, State, StateContext } from '@ngxs/store'
import { Injectable } from '@angular/core'
import {AddListemark, RemoveListenmark, SetListenmarks, SetSearching, UpdateQuery} from './listmarks.state-actions'
import {append, insertItem, patch, removeItem} from '@ngxs/store/operators'
import {ListenmarkDto} from "@app/listenmarks/dto/listenmark.dto";

@State<ListenmarksStateModel>({
  name: 'listenmarks',
  defaults: {
    searchbar: {
      query: '',
      focused: false,
    },
    searching: false,
    listenmarks: [],
  },
})
@Injectable()
export class ListenmarksState {
  @Selector()
  static full(state: ListenmarksStateModel) {
    return state
  }

  @Selector()
  static selectQuery(state: ListenmarksStateModel) {
    return state.searchbar.query
  }

  @Selector()
  static selectSearching(state: ListenmarksStateModel) {
    return state.searching
  }

  @Action(UpdateQuery)
  private updateQuery(ctx: StateContext<ListenmarksStateModel>, { query }: UpdateQuery) {
    ctx.setState(state => ({
      ...state,
      searchbar: {
        ...state.searchbar,
        query,
      },
    }))
  }

  @Action(SetSearching)
  private setSearching(ctx: StateContext<ListenmarksStateModel>, { searching }: SetSearching) {
    ctx.setState(state => ({
      ...state,
      searching,
    }))
  }

  @Action(SetListenmarks)
  private setListenmarks(ctx: StateContext<ListenmarksStateModel>, { listenmarks }: SetListenmarks) {
    ctx.setState(state => ({
      ...state,
      listenmarks,
    }))
  }

  @Action(AddListemark)
  private selectAlbum(ctx: StateContext<ListenmarksStateModel>, { listenmark }: AddListemark) {
    ctx.setState(
      patch({
        listenmarks: insertItem(listenmark),
      })
    )
  }

  @Action(RemoveListenmark)
  private removeListenmark(ctx: StateContext<ListenmarksStateModel>, { id }: RemoveListenmark) {
    ctx.setState(patch({
      listenmarks: removeItem<ListenmarkDto>(l=> l?.id === id)
    }))
  }
}
