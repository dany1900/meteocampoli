import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StazioniSiciliaComponent} from './stazioni-sicilia.component';

describe('MoliseComponent', () => {
  let component: StazioniSiciliaComponent;
  let fixture: ComponentFixture<StazioniSiciliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StazioniSiciliaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniSiciliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
