import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private logueado: boolean = false;
  private usuarioActivo: any;
  private readonly URL_API = 'http://localhost:3000/api/';

  constructor( private http: HttpClient, private toastr: ToastrService ) {

    this.loginf5();

  }

  isLogueado() { return this.logueado; }

  setLogueado(valor: boolean) { this.logueado = valor; }

  getUsuarioActivo() { return this.usuarioActivo; }

  setUsuarioActivo(usuario) { this.usuarioActivo = usuario; }


  login(usuario: any){

    return this.http.post(this.URL_API + 'login', usuario, { withCredentials: true });

  }


  logout() {

    return this.http.get(this.URL_API + 'logout', { withCredentials: true });

  }


  // FUNCION QUE VERIFICA SI EL USUARIO ENTRA POR PRIMERA VEZ O HIZO F5 A LA PAGINA
  loginf5() {

    this.http.get(this.URL_API + 'f5', { withCredentials: true })
    .subscribe((res: any) => {
      
      this.logueado = false;
      this.toastr.error(res.res, 'Su sesion expiro');

    }, err => {

      console.log(err.error);
      this.toastr.success('Por favor, inicia sesión.', 'Bienvenido ^-^');

    });

  }

}
