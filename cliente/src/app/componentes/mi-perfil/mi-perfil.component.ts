import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from "../../servicios/login.service";
import { AbmsService } from "../../servicios/abms.service";


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  @ViewChild('equipoAsignado', {static: false}) equipoAsignado: ElementRef;

  public formGroup: FormGroup;
  hide = true;
  modificar = false;


  constructor( private loginService: LoginService, private router: Router, private formBuilder: FormBuilder,
                private abmsService: AbmsService ) {

  }

  ngOnInit() {

    this.buildForm();
    this.getDatosExaminador();

  }

  buildForm() {

    this.formGroup = this.formBuilder.group({
      nombreReal: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      contraseniaUsuario: ['', [Validators.required, Validators.minLength(4)]],
      tipoUsuario: ['', Validators.required]
    });

    this.formGroup.disable();

    this.formGroup.setValue({
      nombreReal: this.loginService.getUsuarioActivo().nombrereal,
      nombreUsuario: this.loginService.getUsuarioActivo().nombreusuario,
      contraseniaUsuario: this.loginService.getUsuarioActivo().contrasenia,
      tipoUsuario: this.loginService.getUsuarioActivo().tipousuario
    });

  }

  getDatosExaminador() {

    if(this.loginService.getUsuarioActivo().tipousuario == 'examinador') {

      this.abmsService.listarUno('equipo/listar/' + this.loginService.getDatosExaminador().idEquipo)
        .subscribe(res => {

          this.equipoAsignado.nativeElement.value = res[0].nombre;

        }, err => {

          console.log(err);
          
        });

    }

  }

  cerrarSesion() {

    this.loginService.logout().subscribe(res => {

      this.loginService.setLogueado(false);

      this.router.navigate(['/']);

    }, err => {

      console.log(err);
      
    });
    
  }

  modificarUsuario() {

    this.modificar = true;

    this.formGroup.enable();
    this.formGroup.controls['tipoUsuario'].disable();

  }

  cancelar() {

    this.modificar = false;
    this.buildForm();

  }

  guardar() {

    const aux = this.formGroup.value;

    const usuario = { id: this.loginService.getUsuarioActivo().id,
                      nombrereal: aux.nombreReal,
                      nombreusuario: aux.nombreUsuario,
                      contrasenia: aux.contraseniaUsuario,
                      tipousuario: this.loginService.getUsuarioActivo().tipousuario }
    
    this.abmsService.modificacion(usuario, 'usuarios/modificar/' + this.loginService.getUsuarioActivo().id)
      .subscribe(res => {

        this.loginService.setUsuarioActivo(res[0]);

        this.modificar = false;
        this.formGroup.disable();
        
      }, err => {

        console.log(err);
        
      });
    
  }

}
