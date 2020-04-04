import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StazioniGeneraliComponent} from './stazioni-generali.component';

describe('StazioniGeneraliComponent', () => {
  let component: StazioniGeneraliComponent;
  let fixture: ComponentFixture<StazioniGeneraliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StazioniGeneraliComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniGeneraliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
