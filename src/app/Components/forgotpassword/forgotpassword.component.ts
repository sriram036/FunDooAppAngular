import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private router: Router, private User: UserService, private fb: FormBuilder) {
    this.forgotPasswordUser = this.fb.group({
      email: ['', Validators.required]
    });
  }

  forgotPasswordUser = new FormGroup({
    email: new FormControl('')
  });

  ngOnInit(): void {
  }

  goToLogin() {
    this.router.navigate(['/Login']);
  }

  onSubmit(){
    this.User.forgotPassword(this.forgotPasswordUser.controls['email'].value).subscribe((result)=>{
      console.log(result);
    });
  }
}
