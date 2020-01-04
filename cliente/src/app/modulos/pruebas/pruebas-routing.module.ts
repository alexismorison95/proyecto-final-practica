import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebasComponent } from "./pruebas.component";
import { NuevaPruebaComponent } from "./componentes/nueva-prueba/nueva-prueba.component";


const routes: Routes = [
  { path: '', component: NuevaPruebaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PruebasRoutingModule { }
