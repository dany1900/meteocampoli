import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamPistoiaComponent} from './webcam-pistoia.component';

describe('WebcamPistoiaComponent', () => {
  let component: WebcamPistoiaComponent;
  let fixture: ComponentFixture<WebcamPistoiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamPistoiaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamPistoiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
