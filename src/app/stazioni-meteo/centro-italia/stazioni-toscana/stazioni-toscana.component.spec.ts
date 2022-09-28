import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StazioniToscanaComponent} from './stazioni-toscana.component';

describe('AbruzzoComponent', () => {
  let component: StazioniToscanaComponent;
  let fixture: ComponentFixture<StazioniToscanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StazioniToscanaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniToscanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
