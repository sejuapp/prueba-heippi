import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { CommonModule } from "@angular/common";
import { ErrorRoutes } from './error.routing';
import { P404Component } from './not-fount/not-fount.component';

@NgModule({
  imports: [
    RouterModule.forChild(ErrorRoutes),
    CommonModule
  ],
  declarations: [
    P404Component
  ],
  providers: [

  ],
})
export class ErrorModule { }
