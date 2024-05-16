import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {
  @Input('route') route!: string;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigateByUrl(this.route);
  }

}
