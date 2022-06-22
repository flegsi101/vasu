import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {AuthState, RefreshTokens} from '../../state/auth.state';
import {RefreshResponse} from './dto/refresh-response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{

  readonly host: string;

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) {
    this.host = window.location.host;
  }

  ngOnInit() {
    const authState = this.store.selectSnapshot(AuthState.all);
    console.log(authState);
    if (authState?.refreshToken && !authState?.accessToken) {
      this.http.get<RefreshResponse>(`http://localhost:8080/auth/refresh`, {
        headers: {
          'Authorization': 'Bearer ' + authState.refreshToken
        }
      }).subscribe(next => {
        this.store.dispatch(new RefreshTokens({
          accessToken: next.accessToken,
          refreshToken: next.refreshToken,
        }));
        this.router.navigate(['/']);
      });
    }
  }

  login() {
    this.http.get<{ url: string }>(
      `http://localhost:8080/auth/url?redirectUri=http://${this.host}/auth/callback`,
    ).subscribe({
      next: ({url}) => {
        window.location.replace(url);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
