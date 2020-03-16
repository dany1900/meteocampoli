import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StazioniMeteonetworkComponent} from './stazioni-meteonetwork.component';

describe('MeteonetworkComponent', () => {
  let component: StazioniMeteonetworkComponent;
  let fixture: ComponentFixture<StazioniMeteonetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StazioniMeteonetworkComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniMeteonetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
