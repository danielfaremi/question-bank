import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quick-add',
  templateUrl: './quick-add.component.html',
  styleUrls: ['./quick-add.component.css']
})
export class QuickAddComponent implements OnInit {
  addCustomer!: FormGroup;
  addedByUser!: any;
  company_name!: string;
  staffUsername!: string;
  tempFirstName = '';
  tempLastName = '';


  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private fb: FormBuilder
  ) {
    this.addCustomer = this.fb.group({
      firstname: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      middlename: [null],
      dob: [null],
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

  

}
