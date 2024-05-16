import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  GET_QUESTIONS_BY_ID: string = environment.baseUrl + '/question/exam';

  SUBMIT_QUESTIONS_AND_ANSWER: string = environment.baseUrl + '/question/mark';

  constructor(
    private http: HttpClient
  ) { }

  getQuestions(payload: any): Observable<any> {
    return this.http.post<any>(this.GET_QUESTIONS_BY_ID, payload)
  }

  submitQuestions(payload: any): Observable<any> {
    return this.http.put<any>(this.SUBMIT_QUESTIONS_AND_ANSWER, payload)
  }

}
