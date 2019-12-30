import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor( private loginService: LoginService, private router: Router, private toastr: ToastrService ) { }

  canActivate() {

    if (!this.loginService.isLogueado()) {

      this.toastr.error('No ha iniciado sesion.', 'Error');
      this.router.navigate(['/']);
      return false;

    }

    return true;

  }

}
