import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

// DIALOGO
import { DialogoEliminarComponent } from "../dialogo-eliminar/dialogo-eliminar.component";

// INTERFACES
import { EquipoMasPeriodoInterface } from "../../../../interfaces/equipoMasPeriodo";

// TOAST
import { ToastrService } from 'ngx-toastr';

// SERVICIOS
import { AbmsService } from "../../../../servicios/abms/abms.service";


@Component({
  selector: 'app-listar-equipos',
  templateUrl: './listar-equipos.component.html',
  styleUrls: ['./listar-equipos.component.css']
})
export class ListarEquiposComponent implements OnInit {

  columnasTabla: string[] = ['id', 'nombre', 'estado', 'nroactual', 'fechavencimiento'];
  datos: MatTableDataSource<EquipoMasPeriodoInterface>;

  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  @ViewChild(MatSort, { static: true }) ordenar: MatSort;

  selectedRowIndex: any;
  opcionesBool: boolean = true;
  equipoSeleccionado: any;
  ultimo: number;

  constructor(private abmService: AbmsService, 
              private router: Router,
              public dialog: MatDialog,
              private toastr: ToastrService) {
    
    this.cargarTabla();

  }

  ngOnInit() {
  }


  aplicarFiltro(filterValue: string) {

    this.datos.filter = filterValue.trim().toLowerCase();

    if (this.datos.paginator) {
      this.datos.paginator.firstPage();
    }

  }


  cargarTabla() {

    this.abmService.listarTodos<EquipoMasPeriodoInterface>('equipos/listarperiodo').subscribe(res => {
      
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
      this.equipoSeleccionado = null;

    }
    else {

      this.equipoSeleccionado = row;
      this.selectedRowIndex = row.id;
      this.ultimo = row.id;
      this.opcionesBool = false;

    }

  }

  modificarEquipo() {

    this.router.navigateByUrl('equipos/modificar/' + this.equipoSeleccionado.id,
      { state: this.equipoSeleccionado });
    
  }

  eliminarEquipo(): void {

    const dialogRef = this.dialog.open(DialogoEliminarComponent, {
      width: '410px',
      data: this.equipoSeleccionado
    });

    dialogRef.afterClosed().subscribe(id => {

      if (id) {

        this.abmService.baja('equipos/baja/' + id).subscribe((res: any) => {

          console.log(res);

          this.toastr.success(res[0].nombre, 'Eliminado con exito');
          this.cargarTabla();

          this.ultimo = null;
            this.opcionesBool = true;
            this.selectedRowIndex = null;
            this.equipoSeleccionado = null;

        }, err => {

          console.log(err);
          this.toastr.error(err.message, 'Error.')

        });
        
      }

    });

  }

}
