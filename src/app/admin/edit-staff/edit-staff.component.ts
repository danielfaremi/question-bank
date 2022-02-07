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
  editForm!: FormGroup

  imgSource="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

  constructor(
    private actRoute: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder,
    private backend: BackendService
  ) {
    this.company_name = environment.company_name
  }

  ngOnInit(): void {
     this.actRoute.params.subscribe((data: any) => {
      let id = data.id
      this.backend.getById(id).subscribe((response) => {
        this.staffDetails = response.payload
        console.log(this.staffDetails);
      })
    });

    this.buildEditForm();
  }

  buildEditForm(){
    this.editForm = this.fb.group({
      username: [this.staffDetails.username],
    })
  }

  submitForm(){

  }

}
