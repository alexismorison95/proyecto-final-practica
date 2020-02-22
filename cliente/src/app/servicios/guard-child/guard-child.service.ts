import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateChild } from '@angular/router';

import { LoginService } from '../login/login.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GuardChildService implements CanActivateChild {

  constructor( private loginService: LoginService, private router: Router, private toastr: ToastrService ) { }

  canActivateChild() {

    if (!this.loginService.isLogueado()) {

      this.toastr.error('No ha iniciado sesion.', 'Error');
      this.router.navigate(['/']);
      return false;

    }

    return true;

  }
  
}
