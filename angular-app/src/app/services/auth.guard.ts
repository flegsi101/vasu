import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngxs/store';
import {AuthState} from '../state/auth.state';
import { skipConsoleLogging } from "@ngxs/store/internals/testing";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  readonly URL_KEY = "authGuard_url"

  constructor(private router: Router, private store: Store) {
    window.onbeforeunload = () => {
      localStorage.setItem(this.URL_KEY, router.url);
    }
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const authState = this.store.selectSnapshot(AuthState.all);

    if (route.url[0].path !== 'auth' && authState?.refreshToken && !authState?.accessToken) {
      return this.router.createUrlTree(['auth']);
    }

    if (route.url[0].path === 'auth') {
      if (authState?.accessToken) {
        let url = localStorage.getItem(this.URL_KEY)
        if (url) {
          return this.router.createUrlTree(url.split("/"))
        }
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
