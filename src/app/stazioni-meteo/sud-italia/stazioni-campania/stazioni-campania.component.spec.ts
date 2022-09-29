import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StazioniCampaniaComponent} from './stazioni-campania.component';

describe('AbruzzoComponent', () => {
  let component: StazioniCampaniaComponent;
  let fixture: ComponentFixture<StazioniCampaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StazioniCampaniaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniCampaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
