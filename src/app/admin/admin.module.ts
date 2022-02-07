import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { nzModules } from 'src/nzfiles';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewStaffComponent } from './new-staff/new-staff.component';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    NewStaffComponent,
    ManageStaffComponent,
    EditStaffComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    nzModules,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class AdminModule { }
