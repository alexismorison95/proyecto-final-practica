import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logueado: boolean = false;
  usuarioActivo: any;
  private readonly URL_API = 'http://localhost:3000/api/';

  constructor( private _http: HttpClient ) {

    this.loginf5();

  }

  login(usuario: any){

    return this._http.post(this.URL_API + 'login', usuario, { withCredentials: true });

  }


  logout() {

    return this._http.get(this.URL_API + 'logout', { withCredentials: true });

  }


  loginf5() {

    this._http.get(this.URL_API + 'f5', { withCredentials: true })
    .subscribe(res => {


      console.log(res);
    }, err => {

      console.log(err.error);
      this.logueado = false;

    });

  }

}
