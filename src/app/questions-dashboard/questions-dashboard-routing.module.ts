import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'questions',
        pathMatch: 'full'
      },
      {
        path: 'questions',
        component: QuestionsComponent,
      },
      {
        path: 'attempt-quiz',
        component: TakeQuizComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsDashboardRoutingModule { }
