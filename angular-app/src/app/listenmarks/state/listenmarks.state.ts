import {ListenmarksStateModel} from './listenmarks.state-model';
import {Selector, State} from '@ngxs/store';
import {Injectable} from '@angular/core';

@State<ListenmarksStateModel>({
  name: 'listenmarks',
  defaults: {
    searchbar: {
      query: "",
      focused: false
    }
  }
})
@Injectable()
export class ListenmarksState {
  @Selector()
  static String selectQuery()
}
