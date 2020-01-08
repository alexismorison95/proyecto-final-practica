import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarPruebaComponent } from './verificar-prueba.component';

describe('VerificarPruebaComponent', () => {
  let component: VerificarPruebaComponent;
  let fixture: ComponentFixture<VerificarPruebaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificarPruebaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
