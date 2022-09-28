import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StazioniEmiliaRomagnaComponent} from './stazioni-emilia-romagna.component';

describe('MoliseComponent', () => {
  let component: StazioniEmiliaRomagnaComponent;
  let fixture: ComponentFixture<StazioniEmiliaRomagnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StazioniEmiliaRomagnaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniEmiliaRomagnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
