import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { HomeComponent } from './home/home.component';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { NewStaffComponent } from './new-staff/new-staff.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'newstaff',
        component: NewStaffComponent
      },
      {
        path: 'manage-staff',
        component: ManageStaffComponent
      },
      {
        path: 'edit-personnel/:id',
        component: EditStaffComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
