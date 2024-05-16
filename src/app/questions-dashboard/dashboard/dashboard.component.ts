import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = {
    welcomeModal: false
  };

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

    const welcomeModal = localStorage.getItem('displayWelcomeModal');
    if (welcomeModal === 'true') {
      this.loading.welcomeModal = true;
      localStorage.setItem('displayWelcomeModal', 'false');
    };
  }

  closeModal() {
    this.loading.welcomeModal = false;
  }


}
