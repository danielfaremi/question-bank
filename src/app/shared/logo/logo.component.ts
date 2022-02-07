import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  @Input() height?: any;
  @Input() width?: any;
  constructor() { }

  ngOnInit(): void {
  }

}
