import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MaterialModulo } from "../../app.material";

// FORMULARIOS
import { ReactiveFormsModule } from '@angular/forms';

import { PruebasRoutingModule } from './pruebas-routing.module';
import { PruebasComponent } from './pruebas.component';
import { NuevaPruebaComponent } from './componentes/nueva-prueba/nueva-prueba.component';


@NgModule({
  declarations: [PruebasComponent, NuevaPruebaComponent],
  imports: [
    CommonModule,
    PruebasRoutingModule,
    MaterialModulo,
    ReactiveFormsModule
  ]
})
export class PruebasModule { }