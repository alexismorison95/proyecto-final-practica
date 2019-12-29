import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModulo } from "../../app.material";

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { ListarUsuariosComponent } from './componentes/listar-usuarios/listar-usuarios.component';
import { ListarUsuarioComponent } from './componentes/listar-usuario/listar-usuario.component';
import { ModificarUsuarioComponent } from './componentes/modificar-usuario/modificar-usuario.component';
import { AltaUsuarioComponent } from './componentes/alta-usuario/alta-usuario.component';
import { DialogoEliminarComponent } from './componentes/dialogo-eliminar/dialogo-eliminar.component';


@NgModule({
  declarations: [UsuariosComponent, ListarUsuariosComponent, ListarUsuarioComponent, ModificarUsuarioComponent, AltaUsuarioComponent, DialogoEliminarComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModulo
  ],
  entryComponents: [DialogoEliminarComponent]
})
export class UsuariosModule { }
