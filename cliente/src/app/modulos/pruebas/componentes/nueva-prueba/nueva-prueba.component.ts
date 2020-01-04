import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-nueva-prueba',
  templateUrl: './nueva-prueba.component.html',
  styleUrls: ['./nueva-prueba.component.css']
})
export class NuevaPruebaComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit() {

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

}
