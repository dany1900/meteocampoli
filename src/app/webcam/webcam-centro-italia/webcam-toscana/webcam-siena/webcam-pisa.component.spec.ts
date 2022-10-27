import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamPisaComponent} from './webcam-pisa.component';

describe('WebcamPisaComponent', () => {
  let component: WebcamPisaComponent;
  let fixture: ComponentFixture<WebcamPisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamPisaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamPisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
