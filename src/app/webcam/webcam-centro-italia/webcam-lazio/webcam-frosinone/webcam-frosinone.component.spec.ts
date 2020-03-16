import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamFrosinoneComponent} from './webcam-frosinone.component';

describe('WebcamFrosinoneComponent', () => {
  let component: WebcamFrosinoneComponent;
  let fixture: ComponentFixture<WebcamFrosinoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamFrosinoneComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamFrosinoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
