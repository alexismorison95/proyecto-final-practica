import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

// SERVICIOS
import { LoginService } from "../../servicios/login/login.service";
import { AbmsService } from "../../servicios/abms/abms.service";

// INTERFACES
import { PrestamosInterface } from "../../interfaces/prestamo";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup; // Formulario
  hide = true; // Valor bool para mostrar o ocultar la contrasenia


  constructor(private formBuilder: FormBuilder, 
              private loginService: LoginService, 
              private router: Router,
              private abmsService: AbmsService) { }

  ngOnInit() {

    // Construyo el formulario
    this.buildForm();

  }

  buildForm() {

    this.formGroup = this.formBuilder.group({
      nombreUsuario: ['', Validators.required],
      contraseniaUsuario: ['', [Validators.required, Validators.minLength(4)]]
    });

  }

  iniciarSesion() {

    // Tomo los datos del formulario
    const user = this.formGroup.value;
    const usuario = { nombre: user.nombreUsuario, contrasenia: user.contraseniaUsuario };

    // Hago la peticion al servidor
    this.loginService.login(usuario).subscribe(res => {

      // Guardo los datos del usuario en el servicio de login
      this.loginService.setLogueado(true);
      this.loginService.setUsuarioActivo(res);

      // Si el usuario es un examinador necesito traer mas datos para hacer el alta de pruebas
      if(this.loginService.getUsuarioActivo().tipousuario == 'examinador') {

        // Hago la peticion al servidor
        this.abmsService.listarUno<PrestamosInterface>('prestamo/listar/' + this.loginService.getUsuarioActivo().id)
          .subscribe(res => {

            console.log(res);
            // Me quedo con el id de prestamo y id de equipo
            this.loginService.setDatosExaminador({idPrestamo: res[0].id, idEquipo: res[0].idequipo});
            
          }, err => {

            // TODO: hay que manejar este error
            console.log(err);
            
          });
        
      }

      // Si todo esta bien navego al inicio
      this.router.navigate(['/inicio']);

    }, err => {

      // TODO: hay que manejar este error
      console.log(err.error);

    });

  }

}
