import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsDashboardRoutingModule } from './questions-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { QuestionsComponent } from './questions/questions.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TakeQuizComponent,
    QuestionsComponent
  ], 
  imports: [
    CommonModule,
    QuestionsDashboardRoutingModule,
    SharedModule
  ]
})
export class QuestionsDashboardModule { }
