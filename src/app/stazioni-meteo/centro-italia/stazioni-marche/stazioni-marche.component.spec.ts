import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StazioniMarcheComponent} from './stazioni-marche.component';

describe('MoliseComponent', () => {
  let component: StazioniMarcheComponent;
  let fixture: ComponentFixture<StazioniMarcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StazioniMarcheComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
