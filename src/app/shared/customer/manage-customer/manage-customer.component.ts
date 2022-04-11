import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BackendService } from 'src/app/services/backend.service';
import { environment } from 'src/environments/environment';

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

  constructor(
    private router: Router,
    private backend: BackendService,
    private message: NzMessageService,

  ) {
    this.company_name = environment.company_name;
   }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.token = JSON.parse(this.token);
    this.staffOrAdmin = this.token.account_type;
    
  }

  onBack(){
    //check if user is a staff or admin user.
    if (this.staffOrAdmin === 'ADMIN'){
      this.router.navigateByUrl('admin-home');
    } else {
      this.router.navigateByUrl('staff-home');
    }
  }

}
