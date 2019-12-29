import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarUsuariosComponent } from "./componentes/listar-usuarios/listar-usuarios.component";
import { ListarUsuarioComponent } from "./componentes/listar-usuario/listar-usuario.component";
import { AltaUsuarioComponent } from "./componentes/alta-usuario/alta-usuario.component";
import { ModificarUsuarioComponent } from "./componentes/modificar-usuario/modificar-usuario.component";


const routes: Routes = [
  { path: '', component: ListarUsuariosComponent },

  { path: 'nuevo', component: AltaUsuarioComponent },

  { path: 'modificar/:id', component: ModificarUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
