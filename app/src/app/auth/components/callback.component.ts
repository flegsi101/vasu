import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthResponse} from './dto';
import {Store} from '@ngxs/store';
import {SetAuthenticatedUser} from '../../state/auth.state';

@Component({
  selector: 'app-auth-callback',
  template: '<h1>logging in...</h1>',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit{

  private host: string;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private store: Store) {
    this.host = window.location.host;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        if (!params.code) {
          this.router.navigate(['..', 'login']);
        } else {
          const url = `http://localhost:8080/auth/token?code=${params.code}&redirectUri=http://${this.host}/auth/callback`;
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
