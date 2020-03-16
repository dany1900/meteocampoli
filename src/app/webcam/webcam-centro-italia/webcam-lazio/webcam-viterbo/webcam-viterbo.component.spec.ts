import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamViterboComponent} from './webcam-viterbo.component';

describe('WebcamViterboComponent', () => {
  let component: WebcamViterboComponent;
  let fixture: ComponentFixture<WebcamViterboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamViterboComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamViterboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
