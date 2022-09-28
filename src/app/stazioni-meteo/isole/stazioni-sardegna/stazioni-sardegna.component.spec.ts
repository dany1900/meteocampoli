import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StazioniSardegnaComponent} from './stazioni-sardegna.component';

describe('MoliseComponent', () => {
  let component: StazioniSardegnaComponent;
  let fixture: ComponentFixture<StazioniSardegnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StazioniSardegnaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniSardegnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
