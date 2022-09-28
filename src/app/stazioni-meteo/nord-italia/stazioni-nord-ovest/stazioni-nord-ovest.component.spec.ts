import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StazioniNordOvestComponent} from './stazioni-nord-ovest.component';

describe('MoliseComponent', () => {
  let component: StazioniNordOvestComponent;
  let fixture: ComponentFixture<StazioniNordOvestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StazioniNordOvestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniNordOvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
