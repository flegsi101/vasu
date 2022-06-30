import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {patch} from '@ngxs/store/operators';

// |================================================================================================
// | ACTIONS
// |================================================================================================

// |=====[ SET AUTH ]===============================================================================
export class SetAuth {
  static readonly type = '[AUTH_STATE] Set authenticated user';

  constructor(public payload: AuthStateModel) {
  }
}

// |=====[ DELETE AUTHENTICATED USER ]==============================================================
export class RemoveAuthenticatedUser {
  static readonly type = '[AUTH_STATE] Remove authenticated user';

  constructor() {
  }
}

// |=====[ DELETE AUTHENTICATED USER ]==============================================================
export class SetRefreshToken {
  static readonly type = '[AUTH_STATE] Remove authenticated user';

  constructor(public payload: string) {
  }
}

// |================================================================================================
// | MODEL
// |================================================================================================
export interface AuthStateModel {
  id: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

const emptyAuthState = {
  id: "",
  name: "",
  accessToken: "",
  refreshToken: ""
}

// |================================================================================================
// | STATE
// |================================================================================================
@State<AuthStateModel>({
  name: 'appState',
  defaults: emptyAuthState
})
@Injectable({providedIn: "root"})
export class AuthState {

  @Selector()
  static userName(state: AuthStateModel) {
    return state.name;
  }

  @Selector()
  static all(state: AuthStateModel) {
    return state;
  }

  @Action(SetAuth)
  setAuth(context: StateContext<AuthStateModel>, {payload}: SetAuth) {
    context.patchState(payload);
  }

  @Action(RemoveAuthenticatedUser)
  removeAuthenticatedUser(context: StateContext<AuthStateModel>) {
    context.setState(emptyAuthState);
  }

  @Action(SetRefreshToken)
  setRefreshToken(context: StateContext<AuthStateModel>, {payload}: SetRefreshToken) {
    if (!context.getState()) {
      context.setState({
        ...emptyAuthState,
        refreshToken: payload
      });
    } else {
      context.setState(patch({
        refreshToken: payload
      }));
    }
  }
}
