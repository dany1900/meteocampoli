import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamCentroItaliaComponent} from './webcam-centro-italia.component';

describe('CentroItaliaComponent', () => {
  let component: WebcamCentroItaliaComponent;
  let fixture: ComponentFixture<WebcamCentroItaliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamCentroItaliaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamCentroItaliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
