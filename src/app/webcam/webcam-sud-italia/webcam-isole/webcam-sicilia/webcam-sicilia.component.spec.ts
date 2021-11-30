import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamSiciliaComponent} from './webcam-sicilia.component';

describe('SudItaliaComponent', () => {
  let component: WebcamSiciliaComponent;
  let fixture: ComponentFixture<WebcamSiciliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamSiciliaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamSiciliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
