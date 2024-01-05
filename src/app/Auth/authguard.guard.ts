import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private authUser: UserService, private route: Router){}
  canActivate(){
    if(this.authUser.isLoggedIn()){
      return true;
    }
    else{
      console.log("You have not Logged In!!!");
      this.route.navigate(['/Login']);
      return false
    }
  }
}
