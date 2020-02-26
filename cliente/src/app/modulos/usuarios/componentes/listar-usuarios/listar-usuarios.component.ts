import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

// DIALOGO
import { DialogoEliminarComponent } from "../dialogo-eliminar/dialogo-eliminar.component";

// INTERFACES
import { UsuariosInterface } from "../../../../interfaces/usuarios";

// TOAST
import { ToastrService } from 'ngx-toastr';

// SERVICIOS
import { LoginService } from "../../../../servicios/login/login.service";
import { AbmsService } from "../../../../servicios/abms/abms.service";


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  columnasTabla: string[] = ['id', 'nombrereal', 'nombreusuario', 'tipousuario'];
  datos: MatTableDataSource<UsuariosInterface>;

  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  @ViewChild(MatSort, { static: true }) ordenar: MatSort;

  selectedRowIndex: any;
  opcionesBool: boolean = true;
  usuarioSeleccionado: any;
  ultimo: number;


  constructor(private abmService: AbmsService, 
              private router: Router,
              public dialog: MatDialog, 
              private loginService: LoginService, 
              private toastr: ToastrService) {

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
      this.toastr.error(err.error, 'Error.');

    });

  }


  opciones(row: any) {

    if (this.ultimo == row.id) {

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
      { state: this.usuarioSeleccionado });

  }


  eliminarUsuario(): void {

    // El usuario no puede eliminar su propio usuario
    if (this.usuarioSeleccionado.id != this.loginService.getUsuarioActivo().id) {

      // Un administrativo no puede eliminar a un administrador, solo un
      // administrador puede eliminar a otro administrador si lo hubiera
      if (this.usuarioSeleccionado.tipousuario == 'administrador' && 
          this.loginService.getUsuarioActivo().tipousuario != 'administrador') {

        this.toastr.error('No puede eliminar un usuario de rol administrador.', 'Error.')
        console.log("No puede eliminar un usuario de rol administrador");

      }
      else {

        // Abro el dialogo para confirmar la eliminacion
        const dialogRef = this.dialog.open(DialogoEliminarComponent, {
          width: '410px',
          data: this.usuarioSeleccionado
        });
        
        // Si confirmo se ejecuta lo siguiente y me da el id del usuario
        dialogRef.afterClosed().subscribe(id => {
  
          if (id) {
            
            // Envio la peticion al servidor
            this.abmService.baja('usuarios/baja/' + id).subscribe((res: any) => {
  
              console.log(res);
              
              // Muestro confirmacion y recargo la tabla
              this.toastr.success(res[0].nombreusuario, 'Eliminado con exito');
              this.cargarTabla();
              
              // reinicio la seleccion de fila
              this.ultimo = null;
              this.opcionesBool = true;
              this.selectedRowIndex = null;
              this.usuarioSeleccionado = null;
  
            }, err => {
  
              console.log(err);
              this.toastr.error(err.message, 'Error.')
  
            });
  
          }
  
        });
      }

    }
    else {

      this.toastr.error('No puede eliminar su propio usuario.', 'Error.')
      console.log("No puede eliminar su propio usuario");

    }

  }

}
