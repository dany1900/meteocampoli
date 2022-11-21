import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabModelliConfrontoComponent} from './tab-modelli-confronto.component';

describe('TabWebcamComponent', () => {
  let component: TabModelliConfrontoComponent;
  let fixture: ComponentFixture<TabModelliConfrontoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabModelliConfrontoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabModelliConfrontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
