import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamGrossetoComponent} from './webcam-grosseto.component';

describe('WebcamGrossetoComponent', () => {
  let component: WebcamGrossetoComponent;
  let fixture: ComponentFixture<WebcamGrossetoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamGrossetoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamGrossetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
