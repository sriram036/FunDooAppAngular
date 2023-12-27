import { Component, OnInit } from '@angular/core';
import { RegisterModel } from './Models/register-model';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'DemoApp';
  dataSource:RegisterModel[] = new Array<RegisterModel>();

  constructor(private userService : UserService){};

  ngOnInit(): void {
    // this.userService.getUsers().subscribe(Users =>{
    //   this.dataSource = Users;
    //   console.log('Users', this.dataSource);
    // })
  }

  displayedColumns = ['firstName', 'lastName', 'email', 'password'];
}
