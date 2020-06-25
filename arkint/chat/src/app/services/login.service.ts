


import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login_user(user_id:any, password:any):Observable<any>{
    let headers = new HttpHeaders();
    let params = new HttpParams().set('id',user_id).set('pass', password)
    headers.append('Content-Type','application/json')
    return this.http.get(`${environment.basePath}login/manual/manualLogin`,{headers:headers, params:params})
  }

  authenticate(token:any):Observable<any>{
    let headers = new HttpHeaders();
    let params = new HttpParams().set('token',token);
    headers.append('Content-Type','application/json')
    return this.http.get(`${environment.basePath}login/manual/authenticate`,{headers:headers, params:params})
  }

  getall():Observable<any>{
    return this.http.get(`${environment.basePath}login/manual/getall`)
  }

  googleLogin():Observable<any>{
    return this.http.get(`${environment.basePath}login/google/googleLogin`)
  }


}