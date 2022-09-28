import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StazioniSudItaliaComponent} from './stazioni-sud-italia.component';

describe('MoliseComponent', () => {
  let component: StazioniSudItaliaComponent;
  let fixture: ComponentFixture<StazioniSudItaliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StazioniSudItaliaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniSudItaliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
