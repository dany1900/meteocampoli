import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamChietiComponent} from './webcam-chieti.component';

describe('WebcamChietiComponent', () => {
  let component: WebcamChietiComponent;
  let fixture: ComponentFixture<WebcamChietiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamChietiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamChietiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
