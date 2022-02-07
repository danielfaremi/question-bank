import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user!: any;
  today= new Date();

  constructor() {
   }

  ngOnInit(): void {
    this.user = localStorage.getItem('token');
    this.user = JSON.parse(this.user)
    console.log(this.user)
  }


 


}
