import { Injectable } from '@angular/core';
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


  alta<objetoInterface>(objeto: any, ruta: string): Observable<objetoInterface> {

    return this.http.post<objetoInterface>(this.URL_API + ruta, objeto, { withCredentials: true });

  }


  baja<objetoInterface>(ruta: string): Observable<objetoInterface> {

    return this.http.delete<objetoInterface>(this.URL_API + ruta, { withCredentials: true });

  }


  modificacion<objetoInterface>(objeto: any, ruta: string): Observable<objetoInterface>  {

    return this.http.put<objetoInterface>(this.URL_API + ruta, objeto, { withCredentials: true });

  }
  
}
