import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateChild } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardChildService implements CanActivateChild {

  constructor( private loginService: LoginService, private router: Router ) { }

  canActivateChild() {

    if (!this.loginService.isLogueado()) {

      console.log('No estás logueado');
      this.router.navigate(['/']);
      return false;

    }

    return true;

  }
  
}
