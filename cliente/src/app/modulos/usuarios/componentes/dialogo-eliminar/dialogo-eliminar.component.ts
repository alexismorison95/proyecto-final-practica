import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// INTERFACES
import { UsuariosInterface } from "../../../../interfaces/usuarios";

@Component({
  selector: 'app-dialogo-eliminar',
  templateUrl: './dialogo-eliminar.component.html',
  styleUrls: ['./dialogo-eliminar.component.css']
})
export class DialogoEliminarComponent {

  constructor(public dialogRef: MatDialogRef<DialogoEliminarComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: UsuariosInterface) { }

              
  onNoClick(): void {

    this.dialogRef.close();
    
  }

}
