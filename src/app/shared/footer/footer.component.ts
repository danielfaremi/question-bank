import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  company_name: string;
  constructor() {
    this.company_name = environment.company_name;
   }

  ngOnInit(): void {
  }

}
