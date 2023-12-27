import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RegisterModel } from '../Models/register-model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private message = new BehaviorSubject("Default Message from Service.");
  updatedMessage: Observable<string> = this.message.asObservable();

  constructor(private http : HttpClient) { }

  setMessage(message: string) {
    console.log(this.message.value);
    this.message.next(message);
    console.log(this.message.value);
  }
  getUsers(){
    return this.http.get<RegisterModel[]>('https://localhost:44370/api/Users/GetAllUsers');
  }

  registerUser(data:RegisterModel){
    return this.http.post<RegisterModel>('https://localhost:44370/api/Users/Register',data);
  }

  loginUser(data: any){
    return this.http.post('https://localhost:44370/api/Users/Login',data);
  }

  forgotPassword(data: string){
    console.log(data);
    return this.http.post('https://localhost:44370/api/Users/ForgotPassword?email=' + data , null);
  }

  resetPassword(data: any){
    console.log(data);
    return this.http.post('https://localhost:44370/api/Users/ResetPassword', data);
  }
}
