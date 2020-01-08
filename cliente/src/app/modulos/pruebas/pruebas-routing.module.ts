import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebasComponent } from "./pruebas.component";
import { NuevaPruebaComponent } from "./componentes/nueva-prueba/nueva-prueba.component";
import { VerificarPruebaComponent } from "./componentes/verificar-prueba/verificar-prueba.component";


const routes: Routes = [
  { path: '', redirectTo: '/nueva', pathMatch: 'full' },
  { path: 'nueva', component: NuevaPruebaComponent },
  { path: 'verificar', component: VerificarPruebaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PruebasRoutingModule { }
