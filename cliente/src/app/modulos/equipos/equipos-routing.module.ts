import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarEquiposComponent } from "./componentes/listar-equipos/listar-equipos.component";
import { AltaEquipoComponent } from "./componentes/alta-equipo/alta-equipo.component";
import { ModificarEquipoComponent } from "./componentes/modificar-equipo/modificar-equipo.component";


const routes: Routes = [
  { path: '', component: ListarEquiposComponent },

  { path: 'nuevo', component: AltaEquipoComponent },

  { path: 'modificar/:id', component: ModificarEquipoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquiposRoutingModule { }
