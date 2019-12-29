import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminadoresComponent } from './examinadores.component';

describe('ExaminadoresComponent', () => {
  let component: ExaminadoresComponent;
  let fixture: ComponentFixture<ExaminadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
