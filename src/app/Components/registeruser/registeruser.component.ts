import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.scss']
})
export class RegisteruserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToLogin() {
    this.router.navigate(['/Login']);
  }

  onSubmit(form: NgForm) {
    console.log("Login Successfull!");
    console.log(form);
  }
}
