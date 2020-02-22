import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PARA CAMBIAR IDIOMA DE COMPONENTES A ESPANOL
import {MAT_DATE_LOCALE} from '@angular/material';

// LOAD BAR
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// GUARD
import { GuardService } from "./servicios/guard/guard.service";
import { GuardChildService } from "./servicios/guard-child/guard-child.service";

// SERVICIOS
import { LoginService } from "./servicios/login/login.service";
import { AbmsService } from "./servicios/abms/abms.service";

// MATERIAL
import { MaterialModulo } from './app.material';

// HTTP
import { HttpClientModule } from '@angular/common/http';

// FORMULARIOS
import { ReactiveFormsModule } from '@angular/forms';

// TOAST
import { ToastrModule } from 'ngx-toastr';

// COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    NotFoundComponent,
    MiPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModulo,
    ReactiveFormsModule,
    HttpClientModule,

    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),

    LoadingBarHttpClientModule,
    LoadingBarRouterModule
  ],
  providers: [LoginService, 
              GuardService, 
              GuardChildService, 
              AbmsService, 
              { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
