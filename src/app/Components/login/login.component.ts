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

  submitted = false;
  @Input() childMessage = "";

  @Output() messageEvent = new EventEmitter<string>();
  MessageFromChild: string = "Message from child";
  constructor(private router: Router, private fb: FormBuilder, private User: UserService, private _snackBar: MatSnackBar) { 
  }

  message!:string;
  sendMessage():void{
    this.messageEvent.emit(this.MessageFromChild);
  }
  loginUser!: FormGroup

  ngOnInit(): void {
    //console.log(this.childMessage);
    this.User.updatedMessage.subscribe(msg => this.message = msg);
    //console.log(this.message);
    this.message = "New Message from Login";
    //console.log(this.message);
    this.loginUser = this.fb.group({
      email: ['',[ Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
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

  token:string = '';
  onSubmit() {
    this.submitted = true;
    if(this.loginUser.invalid){
      return
    }
    else{
      this.User.loginUser(this.loginUser.value).subscribe((result:any) => {
        //console.log(result.message);
        //console.log(result.data);
        this.loginUser.reset();
        this.submitted = false;
        this._snackBar.open('Login Successful!!', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
        this.token = result.data;
        //console.log(result.data);
        localStorage.setItem('FunDooToken',this.token);
        console.log(localStorage.getItem('FunDooToken'));
        this.User.changeToken(result.data);
        this.router.navigate(['/Dashboard']);
      });
    }
  }
}
