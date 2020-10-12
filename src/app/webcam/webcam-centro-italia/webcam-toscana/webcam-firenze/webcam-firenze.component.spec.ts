import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamFirenzeComponent} from './webcam-firenze.component';

describe('WebcamFirenzeComponent', () => {
  let component: WebcamFirenzeComponent;
  let fixture: ComponentFixture<WebcamFirenzeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamFirenzeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamFirenzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
