import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ListenmarksRoutingModule} from './listenmarks-router.module';
import {ListenmarksComponent} from './components/listenmarks.component';
import { ListensmarksSearchComponent } from './components/listenmarks-search/listensmarks-search.component';
import { ListenmarksListComponent } from './components/listenmarks-list/listenmarks-list.component';


@NgModule({
  declarations: [ListenmarksComponent, ListensmarksSearchComponent, ListenmarksListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ListenmarksRoutingModule,
    FontAwesomeModule
  ]
})
export class ListenmarksModule {

}
