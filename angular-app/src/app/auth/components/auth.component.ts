import {Component, OnInit} from '@angular/core';
import {AuthState, SetRefreshToken} from '../../state/auth.state';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private store: Store) {
  }

  ngOnInit() {
    const storedToken = localStorage.getItem('refreshToken');
    if (storedToken) {
      this.store.dispatch(new SetRefreshToken(storedToken));
    }

    this.store.select(AuthState.all).subscribe((state) => {
      if (state?.refreshToken) {
        localStorage.setItem('refreshToken', state.refreshToken);
      }
    });
  }

}
