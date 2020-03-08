import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PARA CAMBIAR IDIOMA DE COMPONENTES A ESPANOL
import {MAT_DATE_LOCALE} from '@angular/material';

// MATERIAL
import { MaterialModulo } from "../../app.material";

// FORMULARIOS
import { ReactiveFormsModule } from '@angular/forms';

import { PruebasRoutingModule } from './pruebas-routing.module';
import { PruebasComponent } from './pruebas.component';
import { NuevaPruebaComponent } from './componentes/nueva-prueba/nueva-prueba.component';
import { VerificarPruebaComponent } from './componentes/verificar-prueba/verificar-prueba.component';
import { ListarPruebasComponent } from './componentes/listar-pruebas/listar-pruebas.component';


@NgModule({
  declarations: [PruebasComponent, NuevaPruebaComponent, VerificarPruebaComponent, ListarPruebasComponent],
  imports: [
    CommonModule,
    PruebasRoutingModule,
    MaterialModulo,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
})
export class PruebasModule { }
