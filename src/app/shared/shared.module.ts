import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './logo/logo.component';
import { nzModules } from 'src/nzfiles';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClockComponent } from './clock/clock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeModalComponent } from './welcome-modal/welcome-modal.component';
import { CongratsModalComponent } from './congrats-modal/congrats-modal.component';
import { BackButtonComponent } from './back-button/back-button.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    ClockComponent,
    WelcomeModalComponent,
    CongratsModalComponent,
    BackButtonComponent,
  ],
  imports: [
    CommonModule,
    nzModules,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  exports: [
    LogoComponent,
    nzModules,
    HeaderComponent,
    FontAwesomeModule,
    FooterComponent,
    ClockComponent,
    ReactiveFormsModule,
    WelcomeModalComponent,
    CongratsModalComponent,
    BackButtonComponent,
  ]
})
export class SharedModule { }
