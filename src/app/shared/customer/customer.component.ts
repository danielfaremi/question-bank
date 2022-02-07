import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  addCustomer!: FormGroup;
  constructor(
    private fb: FormBuilder,
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
      username: [null, [Validators.required]],
      password: [12345678],
      status: [null],
      account_type: [null],
      added_by: [null]
    })
   }

  ngOnInit(): void {
  }

  onBack(){
    
  }

  submitCustomer(){

  }
}
