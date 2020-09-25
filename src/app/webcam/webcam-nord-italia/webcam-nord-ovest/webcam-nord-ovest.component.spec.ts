import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamNordOvestComponent} from './webcam-nord-ovest.component';

describe('SudItaliaComponent', () => {
  let component: WebcamNordOvestComponent;
  let fixture: ComponentFixture<WebcamNordOvestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamNordOvestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamNordOvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
