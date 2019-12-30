import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbmsService {

  private readonly URL_API = 'http://localhost:3000/api/';

  constructor( private http: HttpClient ) { }

  listarTodos<objetoInterface>(ruta: string): Observable<objetoInterface[]> {

    return this.http.get<objetoInterface[]>(this.URL_API + ruta, { withCredentials: true });

  }

  listarUno<objetoInterface>(ruta: string): Observable<objetoInterface> {

    return this.http.get<objetoInterface>(this.URL_API + ruta, { withCredentials: true });

  }

  alta(objeto: any, ruta: string) {

    return this.http.post(this.URL_API + ruta, objeto, { withCredentials: true });

  }

  baja(ruta: string) {

    return this.http.delete(this.URL_API + ruta, { withCredentials: true });

  }

  modificacion(objeto: any, ruta: string) {

    return this.http.put(this.URL_API + ruta, objeto, { withCredentials: true });

  }
  
}
