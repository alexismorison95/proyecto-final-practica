import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { DialogoEliminarComponent } from "../dialogo-eliminar/dialogo-eliminar.component";

import { UsuariosInterface } from "../../../../interfaces/usuarios";

// import { UsuariosService } from "../../../../servicios/usuarios/usuarios.service";
import { LoginService } from "../../../../servicios/login.service";
import { AbmsService } from "../../../../servicios/abms.service";


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


  constructor( private abmService: AbmsService, private router: Router, 
              public dialog: MatDialog, private loginService: LoginService ) {

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

    this.abmService.listarTodos<UsuariosInterface>('usuarios/listar').subscribe(res => {

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

    this.router.navigateByUrl('usuarios/modificar/' + this.usuarioSeleccionado.id, 
                          {state: this.usuarioSeleccionado});

  }


  eliminarUsuario(): void {

    if (this.usuarioSeleccionado.id != this.loginService.getUsuarioActivo().id) {

      const dialogRef = this.dialog.open(DialogoEliminarComponent, {
        width: '410px',
        data: this.usuarioSeleccionado
      });
  
      dialogRef.afterClosed().subscribe(id => {
  
        if (id) {
  
          this.abmService.baja('usuarios/eliminar/' + id).subscribe(res => {
  
            this.cargarTabla();
            
          });
  
        }
        
      });

    }
    else {

      console.log("No puede eliminar su propio usuario");
      
    }

  }

}
