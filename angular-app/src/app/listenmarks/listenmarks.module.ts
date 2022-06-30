import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ListenmarksRoutingModule} from './listenmarks-router.module';
import {ListenmarksComponent} from './components/listenmarks.component';


@NgModule({
  declarations: [ListenmarksComponent],
  imports: [
    CommonModule,
    FormsModule,
    ListenmarksRoutingModule,
    FontAwesomeModule
  ]
})
export class ListenmarksModule {

}
