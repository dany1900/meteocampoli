import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabCentroWebcamComponent} from './tab-centro-webcam.component';

describe('TabWebcamComponent', () => {
  let component: TabCentroWebcamComponent;
  let fixture: ComponentFixture<TabCentroWebcamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabCentroWebcamComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCentroWebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
