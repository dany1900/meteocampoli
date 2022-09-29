import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StazioniCalabriaComponent} from './stazioni-calabria.component';

describe('AbruzzoComponent', () => {
  let component: StazioniCalabriaComponent;
  let fixture: ComponentFixture<StazioniCalabriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StazioniCalabriaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniCalabriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
