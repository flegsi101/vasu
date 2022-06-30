import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthState, AuthStateModel} from '../state/auth.state';
import {Store} from '@ngxs/store';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public leftAngle = faAngleLeft;
  public auth$: Observable<AuthStateModel>;

  constructor(private store: Store) {
    this.auth$ = store.select(AuthState.all);
  }
}
