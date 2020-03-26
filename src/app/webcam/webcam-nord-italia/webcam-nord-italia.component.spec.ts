import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamNordItaliaComponent} from './webcam-nord-italia.component';

describe('NordItaliaComponent', () => {
  let component: WebcamNordItaliaComponent;
  let fixture: ComponentFixture<WebcamNordItaliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamNordItaliaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamNordItaliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
