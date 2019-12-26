import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../../servicios/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup;

  constructor( private formBuilder: FormBuilder, private loginService: LoginService ) { }

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

    const usuario = {nombre: user.nombreUsuario, contrasenia: user.contraseniaUsuario};

    this.loginService.login(usuario).subscribe(res => {

      console.table(res);
      this.loginService.logueado = true;
      this.loginService.usuarioActivo = res;

    }, err => {

      console.log(err.error);

    });

  }

}
