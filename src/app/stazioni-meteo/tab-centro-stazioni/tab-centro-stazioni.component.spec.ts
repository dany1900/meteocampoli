import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabCentroStazioniComponent} from './tab-centro-stazioni.component';

describe('TabWebcamComponent', () => {
  let component: TabCentroStazioniComponent;
  let fixture: ComponentFixture<TabCentroStazioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabCentroStazioniComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCentroStazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
