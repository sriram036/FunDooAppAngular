import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ForgotpasswordComponent } from './Components/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { RegisteruserComponent } from './Components/registeruser/registeruser.component';
import { NotedashboardComponent } from './Components/notedashboard/notedashboard.component';
import { NotesButtonsComponent } from './Components/notes-buttons/notes-buttons.component';
import { SidebariconbuttonsComponent } from './Components/sidebariconbuttons/sidebariconbuttons.component';
import { ArchiveComponent } from './Components/archive/archive.component';
import { TrashComponent } from './Components/trash/trash.component';
import { EditComponent } from './Components/edit/edit.component';
import { AuthguardGuard } from './Auth/authguard.guard';

const routes: Routes = [
  { path:'Login', component: LoginComponent },
  { path:'forgotpassword', component: ForgotpasswordComponent },
  { path:'resetpassword', component: ResetPasswordComponent },
  { path:'registeruser', component: RegisteruserComponent },
  { path: 'Dashboard', component: NotedashboardComponent, canActivate: [AuthguardGuard]},
  { path: 'notesButtons', component: NotesButtonsComponent, canActivate: [AuthguardGuard] },
  { path: 'sidebuttons', component: SidebariconbuttonsComponent, canActivate: [AuthguardGuard] },
  { path: 'archive', component: ArchiveComponent, canActivate: [AuthguardGuard] },
  { path: 'trash', component: TrashComponent, canActivate: [AuthguardGuard] },
  { path: 'edit', component: EditComponent, canActivate: [AuthguardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
