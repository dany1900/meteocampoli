import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StazioniUmbriaComponent} from './stazioni-umbria.component';

describe('MoliseComponent', () => {
  let component: StazioniUmbriaComponent;
  let fixture: ComponentFixture<StazioniUmbriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StazioniUmbriaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniUmbriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
