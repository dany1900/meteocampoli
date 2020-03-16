import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StazioniAbruzzoComponent} from './stazioni-abruzzo.component';

describe('AbruzzoComponent', () => {
  let component: StazioniAbruzzoComponent;
  let fixture: ComponentFixture<StazioniAbruzzoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StazioniAbruzzoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniAbruzzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
