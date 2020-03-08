import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebasComponent } from "./pruebas.component";
import { NuevaPruebaComponent } from "./componentes/nueva-prueba/nueva-prueba.component";
import { ListarPruebasComponent } from "./componentes/listar-pruebas/listar-pruebas.component";
import { VerificarPruebaComponent } from "./componentes/verificar-prueba/verificar-prueba.component";


const routes: Routes = [
  // { path: '', redirectTo: '/nueva', pathMatch: 'full' },
  { path: '', component: PruebasComponent },
  { path: 'nueva', component: NuevaPruebaComponent },
  { path: 'verificar', component: VerificarPruebaComponent },
  { path: 'listar', component: ListarPruebasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PruebasRoutingModule { }
