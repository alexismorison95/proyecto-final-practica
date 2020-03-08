import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// TOAST
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css']
})
export class CambiarContraseniaComponent {

  public formGroup: FormGroup; // Formulario
  hide = true; // Valor bool para mostrar o ocultar la contrasenia
  hide2 = true;
  hide3 = true;

  constructor(public dialogRef: MatDialogRef<CambiarContraseniaComponent>, 
              @Inject(MAT_DIALOG_DATA) public contrasenia: string,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) {
  
    this.buildForm();

  }
  
  
  buildForm() {

    this.formGroup = this.formBuilder.group({
      contraseniaActual: ['', [Validators.required, Validators.minLength(4)]],
      contraseniaNueva: ['', [Validators.required, Validators.minLength(4)]],
      contraseniaNuevaConfirmar: ['', [Validators.required, Validators.minLength(4)]]
    });
    
  }
  
  onNoClick(): void {

    this.dialogRef.close();
    
  }


  confirmar() {

    if (this.formGroup.value.contraseniaNueva == this.formGroup.value.contraseniaNuevaConfirmar) {

      return this.formGroup.value.contraseniaNueva;

    }
    else {
      this.toastr.error('Las contraseñias deben ser iguales.');
    }
    

  }

}
