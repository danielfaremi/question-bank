import { Component, OnInit } from '@angular/core';
import { faUsersCog, faBook, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  faUsersCog = faUsersCog;
  faUserPlus = faUserPlus;
  faBook = faBook;
  user!: any;
  avatar!: string;

  constructor(
    private backend: BackendService
  ) {
   }

  ngOnInit(): void {
    this.user = this.backend.parseToken();
    console.log(this.user);
    console.log(this.backend.getAccountType());
    this.avatar = this.backend.doAvatar(this.user.firstname, this.user.surname);
    console.log(this.avatar)
  }

  


}
