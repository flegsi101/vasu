import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {AuthState, SetAuth} from '../../state/auth.state';
import {Router} from '@angular/router';
import {VariablesService} from '../../variables.service';
import {AuthResponse} from './dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{

  readonly host: string;
  readonly port: string;

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
    private vars: VariablesService
  ) {
    let addr = window.location.host.split(':')
    this.host = addr[0]
    this.port = addr[1]
  }

  ngOnInit() {
    const authState = this.store.selectSnapshot(AuthState.all)
    if (authState?.refreshToken && !authState?.accessToken) {
      this.http.get<AuthResponse>(`http://${this.host}:8080/auth/refresh`, {
        headers: {
          'Authorization': 'Bearer ' + authState.refreshToken
        }
      }).subscribe(next => {
        this.store.dispatch(new SetAuth({
          id: next.userId,
          name: next.userName,
          accessToken: next.accessToken,
          refreshToken: next.refreshToken
        }))
        let url = localStorage.getItem("authGuard_url")
        this.router.navigateByUrl(url ? url : '/')
      })
    }
  }

  login() {
    this.http.get<{ url: string }>(
      `${this.vars.backendUrl}/auth/url?redirectUri=${this.vars.frontendUrl}/auth/callback`,
    ).subscribe({
      next: ({url}) => {
        window.location.replace(url);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
