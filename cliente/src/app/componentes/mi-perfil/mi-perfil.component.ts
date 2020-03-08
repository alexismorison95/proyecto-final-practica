import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

// DIALOGO
import { CambiarContraseniaComponent } from "../cambiar-contrasenia/cambiar-contrasenia.component";

// SERVICIOS
import { LoginService } from "../../servicios/login/login.service";
import { AbmsService } from "../../servicios/abms/abms.service";

// INTERFACES
import { EquiposInterface } from "../../interfaces/equipos";
import { UsuariosInterface } from 'src/app/interfaces/usuarios';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  @ViewChild('equipoAsignado', {static: false}) equipoAsignado: ElementRef;

  public formGroup: FormGroup; // Formulario
  hide = true; // Valor bool para mostrar o ocultar la contrasenia
  modificar = false; // Valor bool para poder modificar los datos de usuario


  constructor(private loginService: LoginService, 
              private router: Router, 
              private formBuilder: FormBuilder,
              private abmsService: AbmsService,
              public dialog: MatDialog) { }

  ngOnInit() {

    // Construyo el formulario
    this.buildForm();

    // Si el usuario es un examinador traigo algunos datos mas
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

      // Peticion al servidor
      this.abmsService.listarUno<EquiposInterface>('equipos/listar/' + this.loginService.getDatosExaminador().idEquipo)
        .subscribe(res => {

          // Muestro el equipo asignado al examinador
          // TODO: Puede ser que el examinador no tenga equipo asignado
          this.equipoAsignado.nativeElement.value = res.nombre;

        }, err => {

          // TODO: Manejar este error
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

  // Funcion que se llama al cancelar la modificacion de usuario
  cancelar() {

    this.modificar = false;
    this.buildForm();

  }

  cambiarContrasenia() {

    // Abro el dialogo para cambiar contrasenia
    const dialogRef = this.dialog.open(CambiarContraseniaComponent, {
      width: '410px',
      data: this.loginService.getUsuarioActivo().contrasenia
    });

    dialogRef.afterClosed().subscribe(contrasenia => {

      if (contrasenia) {
        
        this.formGroup.controls.contraseniaUsuario.patchValue(contrasenia);
        
      }

    });

  }

  // Funcion que se llama al guardar la modificacion de usuario
  // TODO: al modificar contrasenia ir a nueva pagina y modificar con actual y nueva, etc...
  guardar() {

    const aux = this.formGroup.value;

    const usuario = {
      id: this.loginService.getUsuarioActivo().id,
      nombrereal: aux.nombreReal,
      nombreusuario: aux.nombreUsuario,
      contrasenia: aux.contraseniaUsuario,
      tipousuario: this.loginService.getUsuarioActivo().tipousuario
    }
    
    this.abmsService.modificacion<UsuariosInterface>(usuario, 'usuarios/modificar')
      .subscribe(res => {

        this.loginService.setUsuarioActivo(res);

        this.modificar = false;
        this.formGroup.disable();
        
      }, err => {

        console.log(err);
        
      });
    
  }

}
