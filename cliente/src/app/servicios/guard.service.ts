import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor( private loginService: LoginService, private router: Router ) { }

  canActivate() {

    if (!this.loginService.isLogueado()) {

      console.log('No estás logueado');
      this.router.navigate(['/']);
      return false;

    }

    return true;

  }

}
