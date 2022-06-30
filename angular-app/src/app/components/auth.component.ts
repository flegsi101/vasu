import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {AuthState, SetRefreshToken} from '@app/state';
import {Store} from '@ngxs/store';
import {AuthResponse} from "../dto";
import {SetAuth} from "../state";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {VariablesService} from "../variables.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  readonly host: string;
  readonly port: string;

  componentState: string
  redirectUri: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private store: Store,
    private vars: VariablesService
  ) {
    let addr = window.location.host.split(':')
    this.host = addr[0]
    this.port = addr[1]

    this.componentState = ""
    this.redirectUri = `${this.vars.frontendUrl}/auth`

    this.store.select(AuthState.all).subscribe((state) => {
      if (state?.refreshToken) {
        localStorage.setItem('refreshToken', state.refreshToken)
      }
    });
  }

  ngOnInit() {
    // check if in auth callback
    this.route.queryParams.subscribe({
      next: (params) => {
        if (params['code']) {
          this.componentState = "log in ..."
          const url = `${this.vars.backendUrl}/auth/token?code=${params['code']}&redirectUri=${this.redirectUri}`;
          this.http.get<AuthResponse>(url).subscribe({
            next: (next) => {
              this.store.dispatch(new SetAuth({
                id: next.userId,
                name: next.userName,
                accessToken: next.accessToken,
                refreshToken: next.refreshToken
              }));
              this.router.navigateByUrl('/');
            }
          });
        }
      }
    });

    const authState = this.store.selectSnapshot(AuthState.all)

    // search refreshToken
    let refreshToken = authState?.refreshToken
    if (!refreshToken && (refreshToken = localStorage.getItem('refreshToken') ?? ""))
      this.store.dispatch(new SetRefreshToken(refreshToken));

    // check if to use refreshToken
    if (refreshToken && !authState?.accessToken) {
      this.componentState = "authorisiere ..."
      this.refreshTokens(refreshToken)
    } else {
      this.componentState = "mustLogin"
    }
  }

  login() {
    this.http.get<{ url: string }>(
      `${this.vars.backendUrl}/auth/url?redirectUri=${this.vars.frontendUrl}/auth`,
    ).subscribe({
      next: ({url}) => {
        window.location.replace(url);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  private refreshTokens(refreshToken: string): void {
    this.http.get<AuthResponse>(`http://${this.host}:8080/auth/refresh`, {
      headers: {
        'Authorization': 'Bearer ' + refreshToken
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
