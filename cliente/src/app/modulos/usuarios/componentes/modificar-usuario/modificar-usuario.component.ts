import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// TOAST
import { ToastrService } from 'ngx-toastr';

// SERVICIOS
import { AbmsService } from "../../../../servicios/abms/abms.service";
import { LoginService } from "../../../../servicios/login/login.service";

// INTERFACES
import { UsuariosInterface } from 'src/app/interfaces/usuarios';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {

  public formGroup: FormGroup;
  nR: any; nU: any; id: any; contrasenia: any; rol: any;
  
  tiposUsuarioSelector = [ 'administrador', 'administrativo', 'examinador' ];


  constructor(private router: Router, 
              private abmService: AbmsService, 
              private formBuilder: FormBuilder, 
              private loginService: LoginService, 
              private toastr: ToastrService ) {
    
    this.getDatosParametros();

    this.buildForm();

  }

  ngOnInit() {
    
  }


  getDatosParametros() {

    this.nR = this.router.getCurrentNavigation().extras.state["nombrereal"];
    this.nU = this.router.getCurrentNavigation().extras.state["nombreusuario"];
    this.id = this.router.getCurrentNavigation().extras.state["id"];
    this.contrasenia = this.router.getCurrentNavigation().extras.state["contrasenia"];
    this.rol = this.router.getCurrentNavigation().extras.state["tipousuario"];

  }


  buildForm() {

    this.formGroup = this.formBuilder.group({
      nombreReal: [this.nR, Validators.required],
      nombreUsuario: [this.nU, Validators.required],
      tipoUsuario: [this.rol, Validators.required]
    });

  }


  guardar() {

    const temp = this.formGroup.value;
    const usuario = {
      id: this.id,
      nombrereal: temp.nombreReal,
      nombreusuario: temp.nombreUsuario,
      contrasenia: this.contrasenia,
      tipousuario: temp.tipoUsuario
    }

    this.abmService.modificacion<UsuariosInterface>(usuario, 'usuarios/modificar/' + usuario.id)
    .subscribe(res => {

      // Si el usuario modificado es el mismo, actualizo en el login setvice el usuario activo
      if (res.id == this.loginService.getUsuarioActivo().id) {

        this.loginService.setUsuarioActivo(res);

      }
      console.log(res);
      
      this.toastr.success(res.nombreusuario, 'Modificado con exito');
      this.router.navigate(['/usuarios']);
      
    }, err => {

      console.log(err);
      this.toastr.error(err.message, 'Error.')

      
    });
    
  }

}
