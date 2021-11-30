import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabNordWebcamComponent} from './tab-nord-webcam.component';

describe('TabWebcamComponent', () => {
  let component: TabNordWebcamComponent;
  let fixture: ComponentFixture<TabNordWebcamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabNordWebcamComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabNordWebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
