import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamAscoliComponent} from './webcam-ascoli.component';

describe('WebcamAscoliComponent', () => {
  let component: WebcamAscoliComponent;
  let fixture: ComponentFixture<WebcamAscoliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamAscoliComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamAscoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
