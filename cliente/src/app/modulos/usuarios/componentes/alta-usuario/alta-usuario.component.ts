import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// TOAST
import { ToastrService } from 'ngx-toastr';

// SERVICIOS
import { AbmsService } from "../../../../servicios/abms/abms.service";

// INTERFACES
import { UsuariosInterface } from '../../../../interfaces/usuarios';


@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {

  public formGroup: FormGroup;
  hide = true;

  tiposUsuarioSelector = [ 'administrador', 'administrativo', 'examinador'];


  constructor( private router: Router, private abmService: AbmsService, 
                private formBuilder: FormBuilder, private toastr: ToastrService ) {

      this.formGroup = this.formBuilder.group({
        nombreReal: ['', Validators.required],
        nombreUsuario: ['', Validators.required],
        contrasenia: ['',  [Validators.required, Validators.minLength(4)]],
        tipoUsuario: ['', Validators.required]
      });

    }


  ngOnInit() {
  }


  guardar() {

    const temp = this.formGroup.value;
    const usuario = {
      id: temp.id,
      nombrereal: temp.nombreReal,
      nombreusuario: temp.nombreUsuario,
      contrasenia: temp.contrasenia,
      tipousuario: temp.tipoUsuario
    }

    this.abmService.alta<UsuariosInterface>(usuario, 'usuarios/alta').subscribe(res => {

      this.toastr.success(res[0].nombreusuario, 'Guardado');
      this.router.navigate(['/usuarios']);

    }, err => {

      this.toastr.error(err.message, 'Error');
      console.log(err);
      
    });

  }

}
