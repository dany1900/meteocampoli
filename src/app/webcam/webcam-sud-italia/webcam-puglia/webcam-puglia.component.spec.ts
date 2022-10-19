import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamPugliaComponent} from './webcam-puglia.component';

describe('SudItaliaComponent', () => {
  let component: WebcamPugliaComponent;
  let fixture: ComponentFixture<WebcamPugliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamPugliaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamPugliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
