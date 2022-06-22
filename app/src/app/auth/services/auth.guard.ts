import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {AuthState} from '../../state/auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private store: Store) {  }

  async canActivate(
    route: ActivatedRouteSnapshot,
  ) {
    const authState = this.store.selectSnapshot(AuthState.all);

    if (route.url[0].path !== 'auth' && authState?.refreshToken && !authState?.accessToken) {
      return this.router.createUrlTree(['auth']);
    }

    if (route.url[0].path === 'auth') {
      if (authState?.accessToken) {
        return this.router.createUrlTree(['home']);
      } else {
        return true;
      }
    } else {
      if (authState?.accessToken) {
        return true;
      } else {
        return this.router.createUrlTree(['auth']);
      }
    }
  }
}
