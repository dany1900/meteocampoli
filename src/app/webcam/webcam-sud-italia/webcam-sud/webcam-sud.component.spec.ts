import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamSudComponent} from './webcam-sud.component';

describe('SudItaliaComponent', () => {
  let component: WebcamSudComponent;
  let fixture: ComponentFixture<WebcamSudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamSudComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamSudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
