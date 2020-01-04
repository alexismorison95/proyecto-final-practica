import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../../servicios/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup;
  hide = true;

  constructor( private formBuilder: FormBuilder, private loginService: LoginService, private router: Router ) { }

  ngOnInit() {

    this.buildForm();

  }

  buildForm() {

    this.formGroup = this.formBuilder.group({
      nombreUsuario: ['', Validators.required],
      contraseniaUsuario: ['', [Validators.required, Validators.minLength(4)]]
    });

  }

  register() {

    const user = this.formGroup.value;

    const usuario = { nombre: user.nombreUsuario, contrasenia: user.contraseniaUsuario };

    this.loginService.login(usuario).subscribe(res => {

      this.loginService.setLogueado(true);
      this.loginService.setUsuarioActivo(res);

      this.router.navigate(['/inicio']);

    }, err => {

      console.log(err.error);

    });

  }

}
