import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { GuardService } from "./servicios/guard/guard.service";
import { GuardChildService } from "./servicios/guard-child/guard-child.service";

import { LoginComponent } from './componentes/login/login.component';
import { NotFoundComponent } from "./componentes/not-found/not-found.component";
import { MiPerfilComponent } from "./componentes/mi-perfil/mi-perfil.component";


const routes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'inicio', loadChildren: () => import('./modulos/inicio/inicio.module').then(m => 
    m.InicioModule), canActivateChild: [GuardChildService] },

  { path: 'usuarios', loadChildren: () => import('./modulos/usuarios/usuarios.module').then(m => 
    m.UsuariosModule), canActivateChild: [GuardChildService] },
  
  { path: 'examinadores', loadChildren: () => import('./modulos/examinadores/examinadores.module').then(m => 
    m.ExaminadoresModule), canActivateChild: [GuardChildService] },

  { path: 'equipos', loadChildren: () => import('./modulos/equipos/equipos.module').then(m => 
    m.EquiposModule), canActivateChild: [GuardChildService] },

  { path: 'prestamos', loadChildren: () => import('./modulos/prestamos/prestamos.module').then(m => 
    m.PrestamosModule), canActivateChild: [GuardChildService] },

  { path: 'pruebas', loadChildren: () => import('./modulos/pruebas/pruebas.module').then(m => 
    m.PruebasModule), canActivateChild: [GuardChildService] },

  { path: 'reportes', loadChildren: () => import('./modulos/reportes/reportes.module').then(m => 
    m.ReportesModule), canActivateChild: [GuardChildService] },
  
  { path: 'perfil', component: MiPerfilComponent, canActivate: [GuardService] },

  { path: '**', component: NotFoundComponent, canActivate: [GuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
