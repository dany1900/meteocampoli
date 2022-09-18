import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamEmiliaRomagnaComponent} from './webcam-emilia-romagna.component';

describe('SudItaliaComponent', () => {
  let component: WebcamEmiliaRomagnaComponent;
  let fixture: ComponentFixture<WebcamEmiliaRomagnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamEmiliaRomagnaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamEmiliaRomagnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
