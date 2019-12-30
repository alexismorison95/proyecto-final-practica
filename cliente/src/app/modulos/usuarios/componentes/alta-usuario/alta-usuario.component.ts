import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AbmsService } from "../../../../servicios/abms.service";

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {

  public formGroup: FormGroup;

  tiposUsuarioSelector = [ 'administrador', 'administrativo', 'examinador'];


  constructor( private router: Router, private abmService: AbmsService, 
    private formBuilder: FormBuilder ) {

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

    this.abmService.alta(usuario, 'usuarios/alta').subscribe(res => {

      //console.log(res);
      this.router.navigate(['/usuarios']);

    }, err => {

      console.log(err);
      
    });

  }

}
