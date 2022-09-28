import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StazioniMoliseComponent} from './stazioni-molise.component';

describe('MoliseComponent', () => {
  let component: StazioniMoliseComponent;
  let fixture: ComponentFixture<StazioniMoliseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StazioniMoliseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniMoliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
