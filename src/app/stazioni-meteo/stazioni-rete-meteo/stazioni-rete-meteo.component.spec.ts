import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StazioniReteMeteoComponent } from './stazioni-rete-meteo.component';

describe('ReteNazionaleComponent', () => {
  let component: StazioniReteMeteoComponent;
  let fixture: ComponentFixture<StazioniReteMeteoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StazioniReteMeteoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniReteMeteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
