import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { WelcomeService } from '../../services/welcome.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm!: FormGroup;
  loading = {
    registering: false
  }

  employeeRoles = [
    {
      "id": 1,
      "name": "IT",
      "description": "Information Technology"
    },
    {
      "id": 2,
      "name": "Accounts",
      "description": "Accounting Department"
    },
    {
      "id": 3,
      "name": "Admin",
      "description": "Admin Department"
    },
    {
      "id": 4,
      "name": "Cash Manager",
      "description": "Cash Flow Management"
    },
    {
      "id": 5,
      "name": "Teller",
      "description": "Teller"
    }
  ]

  testRegisterResponse = {
    "id": 3,
    "firstName": "Guy",
    "lastName": "Penrod",
    "email": "guys@yahoo.com",
    "password": "password",
    "difficultyStage": "DIFFICULT",
    "roles": {
      "id": 1,
      "name": "IT",
      "description": "Information Technology"
    }
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private welcomeService: WelcomeService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      role: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.getRoles();
  }

  submitForm() {
    this.loading.registering = true;
    const payload = {
      username: this.signUpForm.controls['username'].value,
      password: this.signUpForm.controls['password'].value,
      role: this.signUpForm.controls['role'].value,
      lastname: this.signUpForm.controls['lastname'].value,
      firstname: this.signUpForm.controls['firstname'].value,
    };

    // setTimeout(() => {
    //   this.loading.registering = false;
    //   this.setRegister();
    // }, 3000);

    this.welcomeService.register(payload).subscribe({
      next: ((response) => {
        if (response) {
          this.loading.registering = false;
          this.setRegister();
        }
      }), error: ((error: HttpErrorResponse) => {
        this.loading.registering = false;
        this.message.error(error.error.message)
      })
    })
  }

  setRegister() {
    // localStorage.setItem('login', 'true');
    // localStorage.setItem('user', JSON.stringify(this.testRegisterResponse));
    // localStorage.setItem('displayWelcomeModal', 'true');
    this.message.success('Registration Successful, Login');
    this.router.navigate(['/', 'welcome', 'login']);
  };

  getRoles() {
    this.welcomeService.getEmployeeRoles().subscribe({
      next: ((response) => {
        if (response) {
          this.employeeRoles = response;
          // this.employeeRoles = this.employeeRoles
        }
      }), error: ((error: HttpErrorResponse) => {
        this.loading.registering = false;
        this.message.error(error.error.message);
      })
    })
  }
}