import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {
  LOGIN_URL: string = environment.baseUrl + "/users/login";

  REGISTER_URL: string = environment.baseUrl + "/users";

  GET_EMPLOYEE_ROLES_URL: string = environment.baseUrl + "/users/role";

  constructor(
    private http: HttpClient
  ) { }

  login(payload: any): Observable<any>{
    return this.http.put<any>(this.LOGIN_URL, payload)
  }

  register(payload: any): Observable<any> {
    return this.http.post<any>(this.REGISTER_URL, payload)
  }

  getEmployeeRoles(): Observable<any> {
    return this.http.get<any>(this.GET_EMPLOYEE_ROLES_URL)
  }

}
