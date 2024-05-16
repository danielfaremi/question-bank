import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { QuestionsService } from '../services/questions-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {
  user: any;
  loading = {
    gettingQuestions: false,
    submittingQuestions: false
  }
  questions = [
    {
      "id": 553,
      "question": "What is my Name?",
      "answers": [
        {
          "id": 889,
          "answer": "My name is your name"
        },
        {
          "id": 890,
          "answer": "My name is our name"
        },
        {
          "id": 891,
          "answer": "My name is your Lam"
        }
      ]
    },
    {
      "id": 553,
      "question": "What is my Name?",
      "answers": [
        {
          "id": 889,
          "answer": "My name is your name"
        },
        {
          "id": 890,
          "answer": "My name is our name"
        },
        {
          "id": 891,
          "answer": "My name is your Lam"
        }
      ]
    }
  ]

  selectedAnswers: { questionId: number, chosenAnsId: number }[] = [];

  constructor(
    private sharedService: SharedService,
    private questionService: QuestionsService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.user = this.sharedService.getUser();
    this.getQuestions();
  }

  getQuestions() {
    this.loading.gettingQuestions = true;
    const payload = {
      userId: this.user.id
    }
    this.questionService.getQuestions(payload).subscribe({
      next: ((response) => {
        if (response) {
          this.loading.gettingQuestions = false;
          // this.questions = this.questions;
          this.questions = response;
        }
      }), error: ((error: HttpErrorResponse) => {
        this.message.error(error.error.message)
        this.loading.gettingQuestions = false;
      })
    })
  }

  setSelected(questionID: number, ansID: number) {
    const index = this.selectedAnswers.findIndex(item => item.questionId === questionID);
    if (index !== -1) { // If questionId exists, update the chosenAnsId
      this.selectedAnswers[index].chosenAnsId = ansID;
    } else {      // If questionId doesn't exist, push a new object with both questionId and ansId
      this.selectedAnswers.push({ questionId: questionID, chosenAnsId: ansID });
    }
  }

  submitAttempt() {
    this.loading.submittingQuestions = true;

    const payload = {
      markings: this.selectedAnswers
    }

    this.questionService.submitQuestions(payload).subscribe({
      next: ((response) => {
        if (response) {
          this.loading.submittingQuestions = false;
        }
      }), error: ((error: HttpErrorResponse) => { 
        this.message.error(error.error.message);
        this.loading.submittingQuestions = false;
      })
    })
  }

}
