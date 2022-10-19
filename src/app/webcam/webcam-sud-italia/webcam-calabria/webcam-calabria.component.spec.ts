import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamCalabriaComponent} from './webcam-calabria.component';

describe('SudItaliaComponent', () => {
  let component: WebcamCalabriaComponent;
  let fixture: ComponentFixture<WebcamCalabriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamCalabriaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamCalabriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
