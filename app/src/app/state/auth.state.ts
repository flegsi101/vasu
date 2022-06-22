import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {patch} from '@ngxs/store/operators';

// |================================================================================================
// | ACTIONS
// |================================================================================================

// |=====[ SET AUTHENTICATED USER ]=================================================================
export interface SetAuthenticatedUserPayload {
  userId: string;
  userName: string;
  accessToken: string;
  refreshToken: string;
}

export class SetAuthenticatedUser {
  static readonly type = '[AUTH_STATE] Set authenticated user';

  constructor(public payload: SetAuthenticatedUserPayload) {
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

// |=====[ REFRESH TOKENS ]=========================================================================
export interface RefreshTokensPayload {
  accessToken: string;
  refreshToken: string;
}

export class RefreshTokens {
  static readonly type = '[AUTH_STATE] Refresh tokens';

  constructor(public payload: RefreshTokensPayload) {
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

// |================================================================================================
// | STATE
// |================================================================================================
@State<AuthStateModel>({
  name: 'appState',
  defaults: null
})
@Injectable()
export class AuthState {

  @Selector()
  static userName(state: AuthStateModel) {
    return state.name;
  }

  @Selector()
  static all(state: AuthStateModel) {
    return state;
  }

  @Action(SetAuthenticatedUser)
  setAuthenticatedUser(context: StateContext<AuthStateModel>, {payload}: SetAuthenticatedUser) {
    context.patchState({
      id: payload.userId,
      name: payload.userName,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken
    });
  }

  @Action(RemoveAuthenticatedUser)
  removeAuthenticatedUser(context: StateContext<AuthStateModel>) {
    context.setState(null);
  }

  @Action(SetRefreshToken)
  setRefreshToken(context: StateContext<AuthStateModel>, {payload}: SetRefreshToken) {
    if (!context.getState()) {
      context.setState({
        id: null,
        name: null,
        accessToken: null,
        refreshToken: payload
      });
    } else {
      context.setState(patch({
        refreshToken: payload
      }));
    }
  }

  @Action(RefreshTokens)
  refreshTokens(context: StateContext<AuthStateModel>, {payload}: RefreshTokens) {
    context.setState(patch({
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken
    }));
  }
}
