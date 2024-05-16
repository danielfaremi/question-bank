import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUsersCog, faUserPlus, faBook } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  faUsersCog = faUsersCog;
  faUserPlus = faUserPlus;
  faBook = faBook;
  avatar!: string;
  user!: any;

  constructor(
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.user = this.sharedService.getUser();
    const firstNameInitial = this.user.firstName.charAt(0).toUpperCase();
    const lastNameInitial = this.user.lastName.charAt(0).toUpperCase();
    this.avatar = (firstNameInitial + lastNameInitial);
  }

  doRoute() {
    this.router.navigate(['/dashboard/attempt-quiz'])
  }

}
