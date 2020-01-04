import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaPruebaComponent } from './nueva-prueba.component';

describe('NuevaPruebaComponent', () => {
  let component: NuevaPruebaComponent;
  let fixture: ComponentFixture<NuevaPruebaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaPruebaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
