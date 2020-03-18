import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamFermoComponent} from './webcam-fermo.component';

describe('WebcamFermoComponent', () => {
  let component: WebcamFermoComponent;
  let fixture: ComponentFixture<WebcamFermoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamFermoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamFermoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
