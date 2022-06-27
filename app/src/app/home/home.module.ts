import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    FormsModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule {}
