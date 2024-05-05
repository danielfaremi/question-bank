import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsDashboardRoutingModule } from './questions-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    QuestionsDashboardRoutingModule,
    SharedModule
  ]
})
export class QuestionsDashboardModule { }
