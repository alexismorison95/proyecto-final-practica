import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { EquiposInterface } from "../../../../interfaces/equipos";

@Component({
  selector: 'app-dialogo-eliminar',
  templateUrl: './dialogo-eliminar.component.html',
  styleUrls: ['./dialogo-eliminar.component.css']
})
export class DialogoEliminarComponent {

  constructor(public dialogRef: MatDialogRef<DialogoEliminarComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: EquiposInterface) { }

              
  onNoClick(): void {

    this.dialogRef.close();
    
  }

}
