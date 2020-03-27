import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabImmagginiWebcamComponent} from './tab-immaggini-webcam.component';

describe('TabImmagginiWebcamComponent', () => {
  let component: TabImmagginiWebcamComponent;
  let fixture: ComponentFixture<TabImmagginiWebcamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabImmagginiWebcamComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabImmagginiWebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
