import { Component } from '@angular/core';
import { LoginService } from "./servicios/login/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private loginService: LoginService) { }
  
}
