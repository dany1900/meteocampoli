import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamNordEstComponent} from './webcam-nord-est.component';

describe('SudItaliaComponent', () => {
  let component: WebcamNordEstComponent;
  let fixture: ComponentFixture<WebcamNordEstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamNordEstComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamNordEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
