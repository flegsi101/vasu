import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ListenmarksRoutingModule} from './listenmarks-router.module';
import {ListenmarksComponent} from './components/listenmarks.component';
import {ListensmarksSearchComponent} from './components/listenmarks-search/listensmarks-search.component';
import {ListenmarksListComponent} from './components/listenmarks-list/listenmarks-list.component';
import {NgxsModule} from '@ngxs/store';
import {ListenmarksState} from './state';


@NgModule({
  declarations: [ListenmarksComponent, ListensmarksSearchComponent, ListenmarksListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ListenmarksRoutingModule,
    FontAwesomeModule,
    NgxsModule.forFeature([ListenmarksState])
  ]
})
export class ListenmarksModule {

}
