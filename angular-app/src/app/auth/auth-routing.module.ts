import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CallbackComponent} from './components/callback.component';
import {AuthComponent} from './components/auth.component';
import {LoginComponent} from './components/login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'callback',
        component: CallbackComponent
      },
      {
        path: '**',
        redirectTo: 'login',
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
