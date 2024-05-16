import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { WelcomeService } from '../../services/welcome.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = {
    loggingIn: false,
  };

  loginForm!: FormGroup;
  isLogin!: boolean;

  testUser = {
    id: 3,
    firstName: "Guy",
    lastName: "Penrod",
    email: "guys@yahoo.com",
    password: "password",
    difficultyStage: "DIFFICULT",
    roles: {
      id: 1,
      name: "IT",
      description: "Information Technology"
    }
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private welcomeService: WelcomeService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm() {
    this.loading.loggingIn = true;
    const payload = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value,
    };

    // setTimeout(() => {
    //   this.loading.loggingIn = false;
    //   this.setLogin();
    // }, 3000);

    // /*
    this.welcomeService.login(payload).subscribe({
      next: ((response) => {
        if (response) {
          this.loading.loggingIn = false;
          this.setLogin(response);
        }
      }), error: ((error: HttpErrorResponse) => {
        this.loading.loggingIn = false;
        this.message.error(error.error.message)
      })
    })
    // */
  }

  setLogin(response: any) {
    localStorage.setItem('login', 'true');
    localStorage.setItem('user', JSON.stringify(response));
    localStorage.setItem('displayWelcomeModal', 'true');
    this.router.navigate(['/', 'dashboard']);
  }

 }
