import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamCampobassoComponent} from './webcam-campobasso.component';

describe('CampobassoComponent', () => {
  let component: WebcamCampobassoComponent;
  let fixture: ComponentFixture<WebcamCampobassoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamCampobassoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamCampobassoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
