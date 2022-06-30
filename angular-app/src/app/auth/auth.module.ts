import {NgModule} from '@angular/core';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthGuard} from './services/auth.guard';
import {LoginComponent} from './components/login.component';
import {AuthComponent} from './components/auth.component';
import {CallbackComponent} from './components/callback.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    CallbackComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AuthModule {}
