import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabModelliTipologiaComponent} from './tab-modelli-tipologia.component';

describe('TabWebcamComponent', () => {
  let component: TabModelliTipologiaComponent;
  let fixture: ComponentFixture<TabModelliTipologiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabModelliTipologiaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabModelliTipologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
