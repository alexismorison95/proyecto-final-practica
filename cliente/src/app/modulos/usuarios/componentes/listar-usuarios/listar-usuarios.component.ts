import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogoEliminarComponent } from "../dialogo-eliminar/dialogo-eliminar.component";

import { UsuariosInterface } from "../../../../interfaces/usuarios";

import { UsuariosService } from "../../../../servicios/usuarios/usuarios.service";

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  columnasTabla: string[] = ['id', 'nombrereal', 'nombreusuario', 'tipousuario'];
  datos: MatTableDataSource<UsuariosInterface>;

  @ViewChild(MatPaginator, {static: true}) paginador: MatPaginator;
  @ViewChild(MatSort, {static: true}) ordenar: MatSort;

  selectedRowIndex: any;
  opcionesBool: boolean = true;
  usuarioSeleccionado: any;
  ultimo: number;


  constructor( private usuariosService: UsuariosService, private router: Router, public dialog: MatDialog ) {

    this.cargarTabla();

  }

  ngOnInit() { }


  aplicarFiltro(filterValue: string) {

    this.datos.filter = filterValue.trim().toLowerCase();

    if (this.datos.paginator) {
      this.datos.paginator.firstPage();
    }

  }

  cargarTabla() {

    this.usuariosService.listarUsuarios().subscribe(res => {

      this.datos = new MatTableDataSource(res);

      this.datos.paginator = this.paginador;
      this.datos.sort = this.ordenar;

    }, err => {

      console.log(err);
      
    });

  }


  opciones(row: any) {
    
    if(this.ultimo == row.id) {

      this.ultimo = null;
      this.opcionesBool = true;
      this.selectedRowIndex = null;
      this.usuarioSeleccionado = null;

    }
    else {

      this.usuarioSeleccionado = row;
      this.selectedRowIndex = row.id;
      this.ultimo = row.id;
      this.opcionesBool = false;

    }
    

  }


  modificarUsuario() {

    console.log(this.usuarioSeleccionado);
    this.router.navigate(['usuarios/modificar/', this.usuarioSeleccionado.id]);

  }


  eliminarUsuario(): void {

    const dialogRef = this.dialog.open(DialogoEliminarComponent, {
      width: '400px',
      data: this.usuarioSeleccionado
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.usuariosService.eliminarUsuario(result).subscribe(res => {

          this.cargarTabla();
          
        });

      }
      
    });

  }

}
