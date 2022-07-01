import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListenmarksComponent} from './components/listenmarks.component';
import {ListenmarksSearchComponent} from "./components/listenmarks-search/listenmarks-search.component";
import {ListenmarksListComponent} from "./components/listenmarks-list/listenmarks-list.component";

const routes: Routes = [
  {
    path: '',
    component: ListenmarksComponent,
    children: [
      {
        path: '',
        component: ListenmarksListComponent
      },
      {
        path: 'search',
        component: ListenmarksSearchComponent
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
export class ListenmarksRoutingModule {}
