import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BackendService } from 'src/app/services/backend.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  addCustomer!: FormGroup;
  addedByUser!: any;
  company_name!: string;
  staffUsername!: string;
  tempFirstName = '';
  tempLastName = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private backend: BackendService,
    private message: NzMessageService,

  ) {
    this.addCustomer = this.fb.group({
      firstname: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      middlename: [null, [Validators.required]],
      dob: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      bank_name: [null, [Validators.required]],
      bank_account_number: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      bank_account_type: [null, [Validators.required]],
      account_type: null,
      status: null,
      added_by: null,
      credit_status: null
    })
   }


  ngOnInit(): void {
    this.addedByUser = localStorage.getItem('token');
    this.addedByUser = JSON.parse(this.addedByUser)
    this.addedByUser = this.addedByUser.firstname + " " + this.addedByUser.surname
    console.log(this.addedByUser)
    this.company_name = environment.company_name
  }

  onBack(){
    
  }

  submitCustomer(){
    this.addCustomer.patchValue({
      account_type: "CUSTOMER",
      status: 'ACTIVE',
      credit_status: 'NO DEBT',
      added_by: this.addedByUser,
    });

    this.backend.addCustomer(this.addCustomer.value).subscribe((response) =>{
      if (response.success == true) {
        this.message.create('success', response.message);
      } else if (response.success == false) {
        this.message.create('warning', response.message)
      }
    }, (err) => {
      this.message.create('error', 'Timeout');
      console.log(JSON.stringify(err))
    });
   
  

  }
}
