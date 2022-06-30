import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {AuthState} from '@app/state';
import {VariablesService} from './variables.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AuthComponent} from "./components/auth.component";
import {AuthGuard} from "@app/services";
import {HomeComponent} from "./components/home.component";

@NgModule({
  declarations: [AppComponent, AuthComponent, HomeComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [
    VariablesService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
