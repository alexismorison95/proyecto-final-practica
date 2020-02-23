import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEquipoComponent } from './alta-equipo.component';

describe('AltaEquipoComponent', () => {
  let component: AltaEquipoComponent;
  let fixture: ComponentFixture<AltaEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
