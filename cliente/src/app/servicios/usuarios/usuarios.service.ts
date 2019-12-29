import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsuariosInterface } from "../../interfaces/usuarios";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly URL_API = 'http://localhost:3000/api/usuarios/';

  constructor( private http: HttpClient ) { }

  listarUsuarios() {

    return this.http.get<UsuariosInterface[]>(this.URL_API + 'listar', { withCredentials: true });

  }


  listarUsuario(id: number) {

    return this.http.get<UsuariosInterface>(this.URL_API + 'listar/' + id, { withCredentials: true });

  }


  modificarUsuario(usuario: any) {

    return this.http.put(this.URL_API + 'modificar/' + usuario.id, usuario, { withCredentials: true });

  }


  eliminarUsuario(id: number) {

    return this.http.delete(this.URL_API + 'eliminar/' + id, { withCredentials: true });

  }


}
