import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModulo } from "../../app.material";

// FORMULARIOS
import { ReactiveFormsModule } from '@angular/forms';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { ListarUsuariosComponent } from './componentes/listar-usuarios/listar-usuarios.component';
import { ModificarUsuarioComponent } from './componentes/modificar-usuario/modificar-usuario.component';
import { AltaUsuarioComponent } from './componentes/alta-usuario/alta-usuario.component';
import { DialogoEliminarComponent } from './componentes/dialogo-eliminar/dialogo-eliminar.component';


@NgModule({
  declarations: [
    UsuariosComponent, 
    ListarUsuariosComponent, 
    ModificarUsuarioComponent, 
    AltaUsuarioComponent, 
    DialogoEliminarComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModulo,
    ReactiveFormsModule
  ],
  entryComponents: [DialogoEliminarComponent]
})
export class UsuariosModule { }
