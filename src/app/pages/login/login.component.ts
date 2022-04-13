import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BackendService } from 'src/app/services/backend.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  company_name: string;
  isLogin!: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private backend: BackendService,
    private message: NzMessageService

  ) { 
    this.company_name = environment.company_name
  }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm() {
    this.isLogin = true;
    console.log('submit', this.loginform.value);
    let userInput = this.loginform.value.username;
    let b = userInput.slice(0, 4);

    if (b === "admi") {
      this.backend.loginOwner(this.loginform.value).subscribe((response) => {
        if (response.success === true) {
          this.message.create('success', response.message);
          this.backend.setToken(JSON.stringify(response.payload));
          //console.log(response.payload);
          this.isLogin = false;
          this.router.navigate(['/admin-home']);
        } else {
          this.message.create('warning', response.message);
          this.isLogin = false;
        }
      }, (err) => {
        this.message.create('error', 'Timeout');
        this.isLogin = false;
        console.log(JSON.stringify(err))
      });

    } else {
      this.backend.loginStaff(this.loginform.value).subscribe(response => {
        if (response.success === true) {
          this.message.create('success', response.message);
          this.isLogin = false;
          this.backend.setToken(JSON.stringify(response.payload));
          //console.log(response.payload);
          this.router.navigate(['/staff-home']);
        } else {
          this.message.create('warning', response.message);
          this.isLogin = false;
        }
      }, (err) => {
        this.message.create('error', 'Timeout');
        this.isLogin = false;
        console.log(JSON.stringify(err));
      });

    } 
    
//  else {
    //   this.message.create('error', 'Invalid Username, Please Try Again');
    // }
  }

}
