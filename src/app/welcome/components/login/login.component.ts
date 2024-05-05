import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = {
    loggingIn: false
  }
  loginForm!: FormGroup;
  isLogin!: boolean;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm() {
    this.setLogin();
  }

  setLogin() {
    localStorage.setItem('login', 'true');
    this.router.navigate(['/', 'dashboard'])
  }

  t(){
    console.log(this.loginForm)
  }
}
