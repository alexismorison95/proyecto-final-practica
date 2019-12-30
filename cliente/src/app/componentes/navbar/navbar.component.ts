import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { LoginService } from "../../servicios/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private administrador: boolean = false;
  private administrativo: boolean = false;
  private examinador: boolean = false;

  constructor( private loginService: LoginService, private router: Router ) { }

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

  cerrarSesion() {

    this.loginService.logout().subscribe(res => {

      console.log(res);
      this.loginService.setLogueado(false);

      this.router.navigate(['/']);

    }, err => {

      console.log(err);
      
    });
    
  }



}
