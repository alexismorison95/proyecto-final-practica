import { Component, OnInit } from '@angular/core';

// SERVICIOS
import { LoginService } from '../../servicios/login/login.service';


@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {

  private examinador: boolean;

  constructor(private loginService: LoginService) { }

  ngOnInit() {

    if (this.loginService.getUsuarioActivo().tipousuario == 'examinador') {
      this.examinador = true;
    }
    else {
      this.examinador = false;
    }

  }

}
