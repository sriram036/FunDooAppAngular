import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.scss']
})
export class RegisteruserComponent implements OnInit {

  parentMessage = "Parent Message";

  submitted = false;

  message!:string;

  messageService!: string;

  addUser!: FormGroup
  constructor(private router: Router, private fb: FormBuilder, private User: UserService, private _snackBar: MatSnackBar) { 
    this.User.updatedMessage.subscribe(msg => this.messageService = msg);
  }

  updateMessage(){
    this.User.setMessage('Message Updated from Register.');
  }
  
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  ngOnInit(): void {
    this.addUser = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });

  }

  receiveMessage($event:any){
    this.message=$event;
    console.log(this.message);
  }
  goToLogin() {
    this.router.navigate(['/Login']);
  }

  onSubmit() {
    this.submitted = true;
    if(this.addUser.invalid){
      return
    }
    else{
      this.User.registerUser(this.addUser.value).subscribe((result) => {
        console.log(result);
        this.addUser.reset();
        this.submitted = false;
        this._snackBar.open('User Registered!!', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
      });
    }
  }
}
