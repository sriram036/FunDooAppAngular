import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() childMessage = "";

  @Output() messageEvent = new EventEmitter<string>();
  MessageFromChild: string = "Message from child (Frustration)";
  constructor(private router: Router, private fb: FormBuilder, private User: UserService, private _snackBar: MatSnackBar) { 
    this.loginUser = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  message!:string;
  sendMessage():void{
    this.messageEvent.emit(this.MessageFromChild);
  }
  loginUser = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  }
  );

  ngOnInit(): void {
    console.log(this.childMessage);
    this.User.updatedMessage.subscribe(msg => this.message = msg);
    console.log(this.message);
    this.message = "New Message from Login";
    console.log(this.message);
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  goToForgotPassword(){
    console.log("Going to Forgot Password!");
    this.router.navigate(['/forgotpassword']);
  }

  goToRegister() {
    console.log("Going to Register Page");
    this.router.navigate(['/registeruser']);
  }

  onSubmit() {
    this.User.loginUser(this.loginUser.value).subscribe((result)=>{
      console.log(result);
      this.loginUser.reset({});
      this._snackBar.open('Login Successful!!', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    });
  }
}
