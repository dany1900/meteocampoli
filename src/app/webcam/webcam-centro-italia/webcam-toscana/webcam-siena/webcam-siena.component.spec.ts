import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamSienaComponent} from './webcam-siena.component';

describe('WebcamPisaComponent', () => {
  let component: WebcamSienaComponent;
  let fixture: ComponentFixture<WebcamSienaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamSienaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamSienaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
