import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamLazioComponent} from './webcam-lazio.component';

describe('LazioComponent', () => {
  let component: WebcamLazioComponent;
  let fixture: ComponentFixture<WebcamLazioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamLazioComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamLazioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
