import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface User {
  name?: string;
  username: string;
  email?: string;
  password: string;
}




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://127.0.0.1:3000/users/register', user, { headers }).pipe(
      map(response => response)
    );
  }
  /*authenticateUser(user: User) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://127.0.0.1:3000/users/authenticate', user, { headers }).pipe(
      map(response => response)
    );
  }*/

  authenticateUser(user: User){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/json');
    return this.http.post('http://127.0.0.1:3000/users/authenticate',user);
  }


  storeUserData(token: any, user: any){
    
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    console.log(token);
    console.log(user);
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}


