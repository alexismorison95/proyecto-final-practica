import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {

  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {

    console.log(this.route.snapshot.paramMap.get("id"));
    
  }

}
