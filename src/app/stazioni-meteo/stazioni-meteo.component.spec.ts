import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StazioniMeteoComponent} from './stazioni-meteo.component';

describe('TemperatureComponent', () => {
  let component: StazioniMeteoComponent;
  let fixture: ComponentFixture<StazioniMeteoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StazioniMeteoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniMeteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
