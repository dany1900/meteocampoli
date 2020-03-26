import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamSudItaliaComponent} from './webcam-sud-italia.component';

describe('SudItaliaComponent', () => {
  let component: WebcamSudItaliaComponent;
  let fixture: ComponentFixture<WebcamSudItaliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamSudItaliaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamSudItaliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
