import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExaminadoresComponent } from "./examinadores.component";


const routes: Routes = [
  { path: '', component: ExaminadoresComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExaminadoresRoutingModule { }
