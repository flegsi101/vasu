import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {AuthState} from './state/auth.state';
import {AuthModule} from './auth/auth.module';
import {HomePageModule} from './home/home.module';
import {VariablesService} from "./variables.service";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    AuthModule,
    HomePageModule
  ],
  providers: [
    VariablesService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
