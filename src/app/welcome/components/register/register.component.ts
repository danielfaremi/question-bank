import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      role: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm() {
    console.log(this.signUpForm)
  }
}