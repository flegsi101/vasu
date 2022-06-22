import {NgModule} from '@angular/core';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthGuard} from './services/auth.guard';
import {LoginComponent} from './components/login.component';
import {AuthComponent} from './components/auth.component';
import {CallbackComponent} from './components/callback.component';
import {TokenManager} from './services/token-manager';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    CallbackComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    AuthRoutingModule
  ],
  providers: [
    AuthGuard,
    TokenManager
  ]
})
export class AuthModule {}
