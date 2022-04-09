import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  staffKey!: string;
  loadLogin!: boolean;

  loginData: any;

  imgSource = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

  constructor(
    private actRoute: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder,
    private backend: BackendService
  ) {
    this.company_name = environment.company_name;
  }

  ngOnInit(): void {
    this.actRoute.params.subscribe((data: any) => {
      let id = data.id
      this.backend.getById(id).subscribe((response) => {
        this.staffDetails = response.payload;
        let staffKey = response.payload?.staff_key;
        this.getLoginHistory(staffKey);
        this.buildEditForm();
      })
    });
  }

  /*
  {
	"payload": {
		"id": "5",
		"firstname": "Daniel",
		"surname": "Emeka",
		"middlename": "asdf",
		"dob": "2022-01-02T10:08:20.619Z",
		"address": "No 10, Main Roundabout, King Street",
		"phone": "080123456789",
		"email": "root@abc.com",
		"gender": "male",
		"date_joined": "Wednesday 19th, January 2022",
		"account_type": "STAFF",
		"staff_key": "staff1216",
		"username": "daniel.emeka",
		"password": "12345",
		"status": "ACTIVE",
		"added_by": "admin0001"
	}
}
   */

  buildEditForm() {
    this.editForm = this.fb.group({
      username: [this.staffDetails.username],
      firstname: [this.staffDetails.firstname],
      middlename: [this.staffDetails.middlename],
      surname: [this.staffDetails.surname],
      dob: [this.staffDetails.dob],
      address: [this.staffDetails.address],
      phone: [this.staffDetails.phone],
      email: [this.staffDetails.email],
      gender: [this.staffDetails.gender],
      date_joined: [this.staffDetails.date_joined],
      account_type: [this.staffDetails.account_type],
      status: [this.staffDetails.status]
    })
    console.log(this.editForm.value)
  }

  getLoginHistory(staffkey: any) {
    this.backend.getLoginHistory(staffkey).subscribe((response) => {
      this.loginData = (response.payload);
      if (response.payload) {
        this.loadLogin = true;
      }
      console.log(this.loginData)
    })
  }

  submitForm() {

  }


}
