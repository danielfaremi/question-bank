import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private backend: BackendService
  ) { }

  ngOnInit(): void {
  }

  doLogout(){
    this.backend.doLogout()
  }


}
