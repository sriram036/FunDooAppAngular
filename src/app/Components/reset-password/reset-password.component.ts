import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../Services/user.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, private User: UserService) { 
    this.userPasswordReset = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  token:string='';
  userPasswordReset = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  ngOnInit(): void {
    this.User.newToken.subscribe(data=>{
      this.token = data;
    });
    console.log(this.token);
  }

  goToLogin(){
    this.router.navigate(['/Login']);
  }

  onSubmit(){
    this.User.resetPassword(this.userPasswordReset.value,this.token).subscribe((result)=>{
      console.log(result);
    });
  }
}
