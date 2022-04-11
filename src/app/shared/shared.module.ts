import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './logo/logo.component';
import { nzModules } from 'src/nzfiles';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClockComponent } from './clock/clock.component';
import { CustomerComponent } from './customer/customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuickAddComponent } from './customer/quick-add/quick-add.component';
import { ManageCustomerComponent } from './customer/manage-customer/manage-customer.component';

import { RouterModule, Routes } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    ClockComponent,
    CustomerComponent,
    QuickAddComponent,
    ManageCustomerComponent
  ],
  imports: [
    CommonModule, 
    nzModules,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    ClockComponent,
    CustomerComponent,
    ManageCustomerComponent
  ]
})
export class SharedModule { }
