import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MaterialModulo } from "../../app.material";

// FORMULARIOS
import { ReactiveFormsModule } from '@angular/forms';

import { EquiposRoutingModule } from './equipos-routing.module';
import { EquiposComponent } from './equipos.component';
import { ListarEquiposComponent } from './componentes/listar-equipos/listar-equipos.component';
import { AltaEquipoComponent } from './componentes/alta-equipo/alta-equipo.component';
import { ModificarEquipoComponent } from './componentes/modificar-equipo/modificar-equipo.component';
import { DialogoEliminarComponent } from './componentes/dialogo-eliminar/dialogo-eliminar.component';


@NgModule({
  declarations: [EquiposComponent, ListarEquiposComponent, AltaEquipoComponent, ModificarEquipoComponent, DialogoEliminarComponent],
  imports: [
    CommonModule,
    EquiposRoutingModule,
    MaterialModulo,
    ReactiveFormsModule
  ],
  entryComponents: [DialogoEliminarComponent]
})
export class EquiposModule { }
