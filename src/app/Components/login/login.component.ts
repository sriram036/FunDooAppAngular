import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToForgotPassword(){
    console.log("Going to Forgot Password!");
    this.router.navigate(['/forgotpassword']);
  }

  goToRegister() {
    this.router.navigate(['/registeruser']);
  }

  onSubmit(form: NgForm) {
    console.log("Login Successfull!");
    console.log(form);
  }
    
}
