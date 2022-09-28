import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StazioniNordEstComponent} from './stazioni-nord-est.component';

describe('MoliseComponent', () => {
  let component: StazioniNordEstComponent;
  let fixture: ComponentFixture<StazioniNordEstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StazioniNordEstComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniNordEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
