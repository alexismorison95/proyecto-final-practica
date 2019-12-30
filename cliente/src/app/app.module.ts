import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// GUARD
import { GuardService } from "./servicios/guard.service";
import { GuardChildService } from "./servicios/guard-child.service";

// SERVICIOS
import { LoginService } from "./servicios/login.service";
import { AbmsService } from "./servicios/abms.service";
import { UsuariosService } from "./servicios/usuarios/usuarios.service";

// MATERIAL
import { MaterialModulo } from './app.material';

// HTTP
import { HttpClientModule } from '@angular/common/http';

// FORMULARIOS
import { ReactiveFormsModule } from '@angular/forms';

// COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModulo,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginService, GuardService, GuardChildService, UsuariosService, AbmsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
