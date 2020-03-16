import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamToscanaComponent} from './webcam-toscana.component';

describe('ToscanaComponent', () => {
  let component: WebcamToscanaComponent;
  let fixture: ComponentFixture<WebcamToscanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamToscanaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamToscanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
