import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabIsoleStazioniComponent} from './tab-isole-stazioni.component';

describe('TabWebcamComponent', () => {
  let component: TabIsoleStazioniComponent;
  let fixture: ComponentFixture<TabIsoleStazioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabIsoleStazioniComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabIsoleStazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
