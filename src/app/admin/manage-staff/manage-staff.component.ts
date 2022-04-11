import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BackendService } from 'src/app/services/backend.service';
import { environment } from 'src/environments/environment';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { faFemale, faMale,faAddressBook, faUserCircle, faPhone, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.css']
})
export class ManageStaffComponent implements OnInit {
  company_name!: string;
  response_load!: boolean;
  spin_load!: boolean;
  loaded_staff?: any;
  visible: boolean = false;

  faFemale = faFemale;
  faMale = faMale;
  faAddressBook = faAddressBook;
  faUserCircle = faUserCircle;
  faPhone = faPhone;
  faMailBulk = faMailBulk;



  imgSource = '../../../assets/icons/person.png';
  constructor(
    private backend: BackendService,
    private message: NzMessageService,
    private modal: NzModalService,
    private router: Router
    ) {
      this.company_name = environment.company_name
     }

  ngOnInit(): void {
    this.spin_load=true;
    this.backend.getAllStaff().subscribe((response) => {
      if (response.payload === null){
        this.response_load = false;
        this.spin_load=false;
        this.message.create("warning",`${response.message}`);
      } else if (response.payload !== null){
        this.loaded_staff = response.payload;
        this.response_load = true;
        this.spin_load=false;
        this.message.create("success",`${response.message}`);
      }
      console.log (response)
    })
  }


  viewModal(profileContent: TemplateRef<{}>, data:any): void {
    console.log(data)
    const modal:NzModalRef = this.modal.create({
      nzTitle: `${data.firstname} ${data.surname}'s Profile`,
      nzContent: profileContent,
      nzFooter: [
        {
          label: 'Cancel',
          type: "primary",
          shape: "round",
          onClick: () => (modal.destroy())
        },
        {
          type: "dashed",
          label: 'Edit',
          onClick: () => (
            modal.destroy(),
            this.router.navigateByUrl(`admin-home/edit-personnel/${data.id}`)
          )}
      ],
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        data: data
      },
      nzOnOk: () => console.log('Click ok')
    });
  }

  
}