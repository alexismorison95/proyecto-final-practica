import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// SERVICIOS
import { AbmsService } from "../../../../servicios/abms/abms.service";
import { LoginService } from "../../../../servicios/login/login.service";

// TOAST
import { ToastrService } from 'ngx-toastr';

// INTERFACES
import { EquiposInterface } from '../../../../interfaces/equipos';
import { ConductoresInterface } from '../../../../interfaces/conductores';
import { DominiosInterface } from '../../../../interfaces/dominio';


@Component({
  selector: 'app-nueva-prueba',
  templateUrl: './nueva-prueba.component.html',
  styleUrls: ['./nueva-prueba.component.css']
})
export class NuevaPruebaComponent implements OnInit {

  isLinear = true;
  conductorFormGroup: FormGroup;
  vehiculoFormGroup: FormGroup;
  examenFormGroup: FormGroup;
  documentacionFormGroup: FormGroup;

  listaConductores: ConductoresInterface[];
  listaVehiculos: DominiosInterface[];

  idConductor;
  idDominio;
  numeroActualEquipo;


  constructor(private formBuilder: FormBuilder, 
              private abmsService: AbmsService, 
              private loginService: LoginService, 
              private toastr: ToastrService,
              private router: Router) {

    this.cargarConductores();
    this.cargarVehiculos();
    
    if(loginService.getUsuarioActivo().tipousuario == 'examinador') {

      this.abmsService.listarUno<EquiposInterface>('equipo/listar/' + this.loginService.getDatosExaminador().idEquipo)
      .subscribe(res => { 

        console.log(res);
        
        this.numeroActualEquipo = res[0].nroactual
        this.examenFormGroup.patchValue({ numeroMuestraExamen: this.numeroActualEquipo });

      });

    }

  }

  ngOnInit() {

    this.conductorFormGroup = this.formBuilder.group({
      dni: ['', Validators.required],
      apellidoConductor: ['', Validators.required],
      nombreConductor: ['', Validators.required]
    });

    this.vehiculoFormGroup = this.formBuilder.group({
      dominioVehiculo: ['', Validators.required],
      descripcionVehiculo: ['', Validators.required]
    });

    this.examenFormGroup = this.formBuilder.group({
      numeroMuestraExamen: ['', Validators.required],
      resultadoExamen: ['0', Validators.required]
    });

    this.examenFormGroup.controls['numeroMuestraExamen'].disable();

    this.documentacionFormGroup = this.formBuilder.group({
      numeroActaDocumentacion: [''],
      numeroRetencionDocumentacion: ['']
    });

  }


  // FUNCIONES FORMULARIO CONDUCTORES

  cargarConductores() {

    this.abmsService.listarTodos<ConductoresInterface>('conductores/listar').subscribe(res => {

      this.listaConductores = res;
      
    }, err => {

      console.log(err);
      
    });

  }

  completarConductor(valor) {

    this.conductorFormGroup.setValue({
      dni: valor.dni,
      apellidoConductor: valor.apellido,
      nombreConductor: valor.nombre
    });
    
  }

  verificarConductor() {

    this.abmsService.listarUno<ConductoresInterface>('conductores/listar/' + this.conductorFormGroup.value.dni).subscribe(res => {

      // No existe el conductor, lo doy de alta
      if(res[0] == null) {

        const aux = this.conductorFormGroup.value;
        const conductor: any = {dni: aux.dni,
                                nombre: aux.nombreConductor,
                                apellido: aux.apellidoConductor}

        this.abmsService.alta(conductor, 'conductores/alta').subscribe((res: any) => {

          console.log(res);
          this.idConductor = res[0].dni;
          
        }, err => {

          console.log(err);
          
        });
        
      }
      else {

        // Como el conductor ya existe me guardo el id del conductor
        this.idConductor = res[0].dni;
        
      }
      
    }, err => {

      console.log(err);
      
    });
    
  }


  // FUNCIONES FORMULARIO VEHICULOS
  
  cargarVehiculos() {

    this.abmsService.listarTodos<DominiosInterface>('dominio/listar').subscribe(res => {

      this.listaVehiculos = res;
      
    }, err => {

      console.log(err);
      
    });

  }

  completarVehiculo(valor) {

    this.vehiculoFormGroup.setValue({
      dominioVehiculo: valor.id,
      descripcionVehiculo: valor.descripcion.toLowerCase()
    });
    
  }

  verificarVehiculo() {

    this.abmsService.listarUno<DominiosInterface>('dominio/listar/' + this.vehiculoFormGroup.value.dominioVehiculo)
      .subscribe(res => {

        if(res[0] == null) {

          // dominio no existe
          const aux = this.vehiculoFormGroup.value;
          const dominio: any = {id: aux.dominioVehiculo,
                                descripcion: aux.descripcionVehiculo}
          
          this.abmsService.alta(dominio, 'dominio/alta').subscribe((res: any) => {

            console.log(res);
            this.idDominio = res[0].id;
            
          }, err => {

            console.log(err);
            
          });

        }
        else {

          // dominio si existe
          this.idDominio = res[0].id

        }

      }, err => {

        console.log(err);
        
      });

  }


  // GUARDAR PRUEBA
  guardarPrueba() {

    const conductorDatos = this.conductorFormGroup.value;
    const vehiculoDatos = this.vehiculoFormGroup.value;
    const examenDatos = this.examenFormGroup.value;
    const documentacionDatos = this.documentacionFormGroup.value;

    const hoy = new Date();
    const fecha = hoy.getDate() + '/' + (hoy.getMonth()+1) + '/' + hoy.getFullYear();
    const hora = hoy.getHours() + ':' + hoy.getMinutes();
    
    if(documentacionDatos.numeroActaDocumentacion == "" && 
        documentacionDatos.numeroRetencionDocumentacion == ""){

      documentacionDatos.numeroActaDocumentacion = 0;
      documentacionDatos.numeroRetencionDocumentacion = 0;

    }

    const prueba:any = {fecha: fecha, hora: hora, nromuestra: this.numeroActualEquipo,
                        resultado: examenDatos.resultadoExamen, nroacta: documentacionDatos.numeroActaDocumentacion,
                        nroretencion: documentacionDatos.numeroRetencionDocumentacion, dniconductor:conductorDatos.dni, iddominio: vehiculoDatos.dominioVehiculo,
                        idprestamo: this.loginService.getDatosExaminador().idPrestamo}
    
    this.abmsService.alta(prueba, 'prueba/alta').subscribe(res => {

      console.log(res);
      this.toastr.success('Nueva prueba guardada', 'Guardado');
      this.router.navigate(['/pruebas']);
      
    }, err => {

      console.log(err);
      
    });

  }

}
