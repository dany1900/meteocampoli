import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabNordStazioniComponent} from './tab-nord-stazioni.component';

describe('TabWebcamComponent', () => {
  let component: TabNordStazioniComponent;
  let fixture: ComponentFixture<TabNordStazioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabNordStazioniComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabNordStazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
