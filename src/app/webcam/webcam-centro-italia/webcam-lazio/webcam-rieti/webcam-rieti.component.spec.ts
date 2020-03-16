import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamRietiComponent} from './webcam-rieti.component';

describe('WebcamRietiComponent', () => {
  let component: WebcamRietiComponent;
  let fixture: ComponentFixture<WebcamRietiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamRietiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamRietiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
