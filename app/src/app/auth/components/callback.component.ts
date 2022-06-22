import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthResponse} from './dto';
import {Store} from '@ngxs/store';
import {SetAuthenticatedUser} from '../../state/auth.state';
import {VariablesService} from "../../variables.service";

@Component({
  selector: 'app-auth-callback',
  template: '<h3>logging in...</h3>',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private store: Store,
    private vars: VariablesService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        if (!params.code) {
          this.router.navigate(['..', 'login']);
        } else {
          const url = `${this.vars.backendUrl}/auth/token?code=${params.code}&redirectUri=${this.vars.frontendUrl}/auth/callback`;
          this.http.get<AuthResponse>(url).subscribe({
            next: (next) => {
              this.store.dispatch(new SetAuthenticatedUser(next));
              this.router.navigate(['/']);
            }
          });
        }
      }
    });
  }
}
