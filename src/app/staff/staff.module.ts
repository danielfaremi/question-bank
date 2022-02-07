import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { nzModules } from 'src/nzfiles';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MyProfileComponent } from './my-profile/my-profile.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule,
    nzModules,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class StaffModule { }
