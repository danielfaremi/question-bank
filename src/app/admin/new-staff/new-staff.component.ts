import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BackendService } from 'src/app/services/backend.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-staff',
  templateUrl: './new-staff.component.html',
  styleUrls: ['./new-staff.component.css']
})
export class NewStaffComponent implements OnInit {
  registrationForm!: FormGroup;
  addedByUser!: any;
  company_name!: string;
  staffUsername!: string;
  tempFirstName = '';
  tempLastName = '';
  isUpdating!: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private backend: BackendService,
    private message: NzMessageService,
    public usernameValidator: ValidatorsService
  ) {
    this.registrationForm = this.fb.group({
      firstname: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      middlename: [null, [Validators.required]],
      dob: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [12345678],
      status: [null],
      account_type: [null],
      added_by: [null]
    })
  }


  ngOnInit(): void {
    this.addedByUser = localStorage.getItem('token');
    this.addedByUser = JSON.parse(this.addedByUser)
    this.addedByUser = this.addedByUser.staff_key
    console.log(this.addedByUser)
    this.company_name = environment.company_name
  }

  submitForm() {
    if (this.registrationForm.valid) {
      this.staffUsername = this.registrationForm.controls['firstname'].value + "." + this.registrationForm.controls['surname'].value;
      this.staffUsername = this.staffUsername.toLocaleLowerCase();

      this.registrationForm.patchValue({
        added_by: this.addedByUser,
        username: this.staffUsername,
        account_type: "STAFF",
        status: 'ACTIVE'
      });

      this.backend.registerStaff(this.registrationForm.value).subscribe((response) => {
        if (response.success == true) {
          this.message.create('success', response.message);
        } else if (response.success == false) {
          this.message.create('warning', response.message)
        }
      }, (err) => {
        this.message.create('error', 'Timeout');
        console.log(JSON.stringify(err))
      });
    } else {
      Object.values(this.registrationForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  doUsername(value: string): void {
    let a = (this.registrationForm.controls['firstname'].value);
    let b = this.registrationForm.controls['surname'].value;

    if (!this.registrationForm.controls['surname'].value) {
      let staffUsername = `${a}.`;
      this.registrationForm.get('username')!.setValue(value = `${staffUsername.toLowerCase()}`);
    } else {
      let staffUsername = `${a}.${b}`;
      this.registrationForm.get('username')!.setValue(value = `${staffUsername.toLowerCase()}`)
    }
  }

}
