import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../servicios/login.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  cerrarSesion() {

    this.loginService.logout().subscribe(res => {

      console.log(res);
      this.loginService.logueado = false;

    }, err => {

      console.log(err);
      
    });
    
  }

}
