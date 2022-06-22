import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {AuthState, SetRefreshToken} from '../../state/auth.state';

@Injectable({providedIn: 'root'})
export class TokenManager {

  readonly key = 'refreshToken';

  constructor(store: Store) {

    const storedToken = localStorage.getItem(this.key);
    if (storedToken) {
      store.dispatch(new SetRefreshToken(storedToken));
    }

    store.select(AuthState.all).subscribe((state) => {
      if (state?.refreshToken) {
        localStorage.setItem(this.key, state.refreshToken);
      }
    });
  }
}
