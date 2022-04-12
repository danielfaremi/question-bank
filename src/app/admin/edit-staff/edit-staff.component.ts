import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Payload } from 'src/app/interfaces/interfaces';
import { BackendService } from 'src/app/services/backend.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.css']
})
export class EditStaffComponent implements OnInit {
  staffDetails!: any;
  company_name?: string;
  editForm!: FormGroup;
  staffKey?: string;
  staffId!: number;
  loadLogin!: boolean;
  loginData: any = [];
  spin!: boolean;
  isUpdating!: boolean;
  loginDisabled!: boolean;
  loadingLogin!: boolean;

  imgSource = '../../../assets/icons/person.png';

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private message: NzMessageService,
    private fb: FormBuilder,
    private backend: BackendService
  ) {
    this.company_name = environment.company_name;
  }

  ngOnInit(): void {
    this.spin = true;
    this.actRoute.params.subscribe((data: any) => {
      let id = data.id
      this.backend.getById(id).subscribe((response) => {
        this.staffDetails = response.payload;
        this.staffKey = response.payload?.staff_key;
        this.getLoginHistory(this.staffKey);
        this.buildEditForm();
        this.spin = false;
        this.staffId = id;
      })
    });
  }

  buildEditForm() {
    this.editForm = this.fb.group({
      username: [this.staffDetails.username, [Validators.required]],
      firstname: [this.staffDetails.firstname, [Validators.required]],
      middlename: [this.staffDetails.middlename],
      surname: [this.staffDetails.surname, [Validators.required]],
      dob: [this.staffDetails.dob, [Validators.required]],
      address: [this.staffDetails.address, [Validators.required]],
      phone: [this.staffDetails.phone, [Validators.required]],
      email: [this.staffDetails.email, [Validators.required]],
      gender: [this.staffDetails.gender, [Validators.required]],
      staffKey: [null]
    });
    this.editForm.patchValue({
      staffKey: this.staffKey
    });
    // console.log(this.editForm.value)
  }

  getLoginHistory(staffkey: any) {
    this.loadingLogin = true;
    this.backend.getLoginHistory(staffkey).subscribe((response) => {
      this.loginData = (response.payload);
      this.loadingLogin = false;
      if (this.loginData.length == 0) {
        this.loadLogin = false;
      }
      // console.log(this.loginData);
    })
  }

  doUsername(value: string): void {
    let a = (this.editForm.controls['firstname'].value);
    let b = this.editForm.controls['surname'].value;

    if (!this.editForm.controls['surname'].value) {
      let staffUsername = `${a}.`;
      this.editForm.get('username')!.setValue(value = `${staffUsername.toLowerCase()}`);
    } else {
      let staffUsername = `${a}.${b}`;
      this.editForm.get('username')!.setValue(value = `${staffUsername.toLowerCase()}`);
    }
  }

  submitForm() {
    if (this.editForm.valid) {
      this.isUpdating = true;
      this.backend.updateStaffProfile(this.editForm.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.success == true) {
            this.message.create('success', `${response.message}`);
            this.isUpdating = false;
            this.router.navigateByUrl('admin-home/manage-staff')
          } else if (response.success == false) {
            this.message.create('warning', `${response.message}`);
          }
        }, error: (error) => {
          console.log(JSON.stringify(error));
        }
      });
    } else {
      Object.values(this.editForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}








      // this.backend.updateStaffProfile(this.editForm.value).subscribe((response) => {
      //   if (response.success == true) {
      //     this.message.create('success', `${response.message}`);
      //     this.isUpdating = false;
      //     this.router.navigateByUrl('admin-home/manage-staff')
      //   } else if (response.success == false) {
      //     this.message.create('warning', `${response.message}`);
      //   }
      // }, (err) => {
      //   this.message.create('error', 'Timeout');
      //   // console.log(JSON.stringify(err));
      // });

