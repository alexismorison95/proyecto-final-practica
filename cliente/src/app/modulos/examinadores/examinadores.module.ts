import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExaminadoresRoutingModule } from './examinadores-routing.module';
import { ExaminadoresComponent } from './examinadores.component';


@NgModule({
  declarations: [ExaminadoresComponent],
  imports: [
    CommonModule,
    ExaminadoresRoutingModule
  ]
})
export class ExaminadoresModule { }
