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

  parentMessage = "Parent Message (Advice)";

  message!:string;

  messageService!: string;

  constructor(private router: Router, private fb: FormBuilder, private User: UserService, private _snackBar: MatSnackBar) { 
    this.addUser = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.User.updatedMessage.subscribe(msg => this.messageService = msg);
  }

  updateMessage(){
    this.User.setMessage('Message Updated from Register.');
  }
  addUser = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  }
  );

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  ngOnInit(): void {
  }

  receiveMessage($event:any){
    this.message=$event;
    console.log(this.message);
  }
  goToLogin() {
    this.router.navigate(['/Login']);
  }

  onSubmit() {
    this.User.registerUser(this.addUser.value).subscribe((result)=>{
      console.log(result);
      this.addUser.reset({});
      this._snackBar.open('User Registered!!', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    });
  }
}
