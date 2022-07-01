import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthState, AuthStateModel} from '@app/state';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public auth$: Observable<AuthStateModel>;

  constructor(private store: Store) {
    this.auth$ = store.select(AuthState.all);
  }
}
