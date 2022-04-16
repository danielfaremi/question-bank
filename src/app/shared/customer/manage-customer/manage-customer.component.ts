import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BackendService } from 'src/app/services/backend.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { environment } from 'src/environments/environment';
import { faFemale, faMale,faAddressBook, faUserCircle, faPhone, faMailBulk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent implements OnInit {
    
  token!: any;
  company_name!: string;
  staffOrAdmin!: string;
  spin_load!: boolean;
  isLoading!: boolean;
  response_load!: boolean;
  loaded_customers: any;
  
  faFemale = faFemale;
  faMale = faMale;
  faAddressBook = faAddressBook;
  faUserCircle = faUserCircle;
  faPhone = faPhone;
  faMailBulk = faMailBulk;

  imgSource = '../../../assets/icons/person.png';

  constructor(
    private router: Router,
    public backend: BackendService,
    private message: NzMessageService,
    private modal: NzModalService,

  ) {
    this.company_name = environment.company_name;
   }

  ngOnInit(): void {
    this.spin_load = true
    this.token = localStorage.getItem('token');
    this.token = JSON.parse(this.token);
    this.staffOrAdmin = this.token.account_type;
    this.backend.getAllCustomers().subscribe((response) => {
      if (response.payload === null){
        this.response_load = false;
        this.spin_load=false;
        this.message.create("warning",`${response.message}`);
      } else if (response.payload !== null){
        this.loaded_customers = response.payload;
        this.response_load = true;
        this.spin_load=false;
        this.message.create("success",`${response.message}`);
      }console.log(this.loaded_customers)
    })
    
  }

  onBack(){
    //check if user is a staff or admin user.
    if (this.staffOrAdmin === 'ADMIN'){
      this.router.navigateByUrl('admin-home');
    } else {
      this.router.navigateByUrl('staff-home');
    }
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
