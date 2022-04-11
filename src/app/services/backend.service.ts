import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { timeout } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { login, Response, newStaff, Payload } from '../interfaces/interfaces';
import { IEditStaff, IStaffUpdate } from '../interfaces/IEditStaff';
import { ICustomerFull } from '../interfaces/ICustomer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  valid!: boolean;
  server: string;
  constructor(
    public http: HttpClient,
    private router: Router,
    private message: NzMessageService
  ) {
    this.server = environment.serverUrl;
    if (this.server){
      console.log('Hello ServiceProvider Provider')
    }
  }

  registerStaff(staff: newStaff): Observable<Response> {
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

  loginOwner(user: login) {
    let body = {
      forbackend: 'login_owner',
      username: user.username,
      password: user.password
    }

    return this.http.post<Response>(this.server, JSON.stringify(body))
      .pipe(timeout(59000))
      .pipe(map(response => response))
  }

  loginStaff(user: login) {
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

  parseToken() {
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
    this.message.create('success', 'Logged Out Successfully')
    this.router.navigate(['login']);
  }


  getAllStaff() {
    let body = {
      forbackend: 'getAllStaff'
    }

    return this.http.post<Response>(this.server, JSON.stringify(body))
      .pipe(timeout(59000))
      .pipe(map(response => response))
  }

  getById(id: number): Observable<Response> {
    let body = {
      forbackend: 'getStaffById',
      id: id
    }

    return this.http.post<Response>(this.server, JSON.stringify(body))
      .pipe(timeout(59000))
      .pipe(map(response => response))
  }

  getAccountType() {
    //get user account type fro  parsed token
    let userLogged: Payload = this.parseToken();
    return userLogged.account_type;
  }

  updateStaffPassword(password: string, id: number): Observable<Response> {
    let body = {
      forbackend: 'updateStaffPassword',
      password: password,
      id: id
    }

    return this.http.post<Response>(this.server, JSON.stringify(body))
      .pipe(timeout(59000))
      .pipe(map(response => response))
  }

  disableStaffLogin(status: string, id: number): Observable<Response> {
    let body = {
      forbackend: 'disableStaffLogin',
      status: status,
      id: id
    }

    return this.http.post<Response>(this.server, JSON.stringify(body))
      .pipe(timeout(59000))
      .pipe(map(response => response))
  }

  editStaffProfile(staffProfile: IEditStaff, id: number): Observable<Response> {
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

  addCustomer(customerDetails: ICustomerFull): Observable<Response> {
    let body = {
      forbackend: 'registerCustomer',
      firstname: customerDetails.firstname,
      surname: customerDetails.surname,
      middlename: customerDetails.middlename,
      address: customerDetails.address,
      phone: customerDetails.phone,
      gender: customerDetails.gender,
      account_type: customerDetails.account_type,
      status: customerDetails.status,
      added_by: customerDetails.added_by,
      dob: customerDetails.dob,
      email: customerDetails.email,
      bank_name: customerDetails.bank_name,
      bank_account_number: customerDetails.bank_account_number,
      bank_account_type: customerDetails.bank_account_type,
      credit_status: customerDetails.credit_status
    }

    return this.http.post<Response>(this.server, JSON.stringify(body))
      .pipe(timeout(59000))
      .pipe(map(response => response))
  }

  getLoginHistory(staffkey: string): Observable<Response>{
    let body = {
      forbackend: 'getLogDetails',
      staffkey: staffkey
    }

    return this.http.post<Response>(this.server, JSON.stringify(body))
      .pipe(timeout(59000))
      .pipe(map(response => response))
  }

  updateStaffProfile(staffUpdateForm: IStaffUpdate): Observable<Response>{
    let body = {
      forbackend: 'updateStaff',
      address: staffUpdateForm.address,
      dob: staffUpdateForm.dob,
      email: staffUpdateForm.email,
      firstname: staffUpdateForm.firstname,
      gender: staffUpdateForm.gender,
      middlename: staffUpdateForm.middlename,
      phone: staffUpdateForm.phone,
      surname: staffUpdateForm.surname,
      username: staffUpdateForm.username,
      staffKey: staffUpdateForm.staffKey
    }

    return this.http.post<Response>(this.server, JSON.stringify(body))
      .pipe(timeout(59000))
      .pipe(map(response => response))
  }






}
