import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { timeout } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { login, Response, newStaff, Payload } from '../interfaces/interfaces';
import { IEditStaff } from '../interfaces/IEditStaff';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  valid!: boolean;
  server: string = 'http://localhost/kayapi/api.php'
  constructor(      
    public http: HttpClient,
    private router: Router,
    private message: NzMessageService
) { console.log('Hello ServiceProvider Provider') }

    registerStaff(staff: newStaff){
      let body = {
        forbackend: 'register_staff',
        firstname: staff.firstname,
        surname: staff.surname,
        middlename: staff.middlename,
        dob: staff.dob,
        address: staff.address,
        phone: staff.phone,
        email: staff.email,
        gender: staff.gender,
        account_type: staff.account_type,
        username: staff.username,
        password: staff.password,
        status: staff.status,
        added_by: staff.added_by
      }
      
      return this.http.post<Response>(this.server, JSON.stringify(body))
        .pipe(timeout(59000)) // 59 sec
        .pipe(map(res => res));      
    }

    loginOwner(user: login){
      let body = {
        forbackend: 'login_owner',
        username: user.username,
        password: user.password
      }

      return this.http.post<Response>(this.server, JSON.stringify(body))
        .pipe(timeout(59000))
        .pipe(map(response => response))
    }

    loginStaff(user: login){
      let body = {
        forbackend: 'login_staff',
        username: user.username,
        password: user.password
      }

      return this.http.post<Response>(this.server, JSON.stringify(body))
        .pipe(timeout(59000))
        .pipe(map(response => response))
    }

    setToken(token: any): void {
      localStorage.setItem('token', token);
    }

    parseToken(){
      let c = this.getToken();
      const userToken = JSON.parse(c);
      return userToken;
    }
  
    getToken(): any | null {
      return localStorage.getItem('token');
    }

    isLoggedIn() {
      //check if local storage session is empty
      return this.getToken() !== null; //returns true if getToken is not empty
    }

    doLogout() {
      localStorage.removeItem('token');
      this.message.create('success', 'Logged Out Successfully' )
      this.router.navigate(['login']);
    }


    getAllStaff(){
      let body = {
        forbackend: 'getAllStaff'
      }

      return this.http.post<Response>(this.server, JSON.stringify(body))
        .pipe(timeout(59000))
        .pipe(map(response => response))
    }

    getById(id: number): Observable<Response>{
      let body = {
        forbackend: 'getStaffById',
        id: id
      }

      return this.http.post<Response>(this.server, JSON.stringify(body))
        .pipe(timeout(59000))
        .pipe(map(response => response))
    }

    getAccountType(){
      //get user account type fro  parsed token
      let userLogged:Payload = this.parseToken();
      return userLogged.account_type;
    }

    updateStaffPassword(password: string, id: number): Observable<Response>{
      let body = {
        forbackend: 'updateStaffPassword',
        password: password,
        id: id
      }

      return this.http.post<Response>(this.server, JSON.stringify(body))
      .pipe(timeout(59000))
        .pipe(map(response => response))
    }

    editStaffProfile(staffProfile: IEditStaff, id: number): Observable<Response>{
      let body = {
        forbackend: 'updateStaffProfile',
        address: staffProfile.address,
        dob: staffProfile.dob,
        email: staffProfile.email,
        firstname: staffProfile.firstname,
        gender: staffProfile.gender,
        middlename: staffProfile.middlename,
        phone: staffProfile.phone,
        surname: staffProfile.surname,
        username: staffProfile.username,
        id: id
      }

      return this.http.post<Response>(this.server, JSON.stringify(body))
      .pipe(timeout(59000))
        .pipe(map(response => response))
    }
  







}
