import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamArezzoComponent} from './webcam-arezzo.component';

describe('WebcamPisaComponent', () => {
  let component: WebcamArezzoComponent;
  let fixture: ComponentFixture<WebcamArezzoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamArezzoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamArezzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
