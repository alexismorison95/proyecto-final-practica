import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PruebasRoutingModule } from './pruebas-routing.module';
import { PruebasComponent } from './pruebas.component';


@NgModule({
  declarations: [PruebasComponent],
  imports: [
    CommonModule,
    PruebasRoutingModule
  ]
})
export class PruebasModule { }
