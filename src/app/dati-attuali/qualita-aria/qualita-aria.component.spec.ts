import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QualitaAriaComponent} from './qualita-aria.component';

describe('TemperatureMareComponent', () => {
  let component: QualitaAriaComponent;
  let fixture: ComponentFixture<QualitaAriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualitaAriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualitaAriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
