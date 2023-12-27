import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ForgotpasswordComponent } from './Components/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { RegisteruserComponent } from './Components/registeruser/registeruser.component';
import { NotedashboardComponent } from './Components/notedashboard/notedashboard.component';

const routes: Routes = [
  {path:'Login', component: LoginComponent},
  {path:'forgotpassword', component: ForgotpasswordComponent},
  {path:'resetpassword', component: ResetPasswordComponent},
  {path:'registeruser', component: RegisteruserComponent},
  {path:'Dashboard', component: NotedashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
