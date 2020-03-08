import { Component, OnInit } from '@angular/core';

// SERVICIOS
import { LoginService } from "../../servicios/login/login.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private administrador: boolean = false;
  private administrativo: boolean = false;
  private examinador: boolean = false;

  constructor( private loginService: LoginService ) { }

  ngOnInit() {

    if (this.loginService.getUsuarioActivo().tipousuario == 'administrador') {

      this.administrador = true;

    }
    else {
      
      if (this.loginService.getUsuarioActivo().tipousuario == 'administrativo') {
        
        this.administrativo = true;

      }
      else {

        this.examinador = true;

      }

    }

  }

}
