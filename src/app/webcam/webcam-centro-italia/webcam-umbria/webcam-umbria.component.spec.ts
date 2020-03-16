import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamUmbriaComponent} from './webcam-umbria.component';

describe('UmbriaComponent', () => {
  let component: WebcamUmbriaComponent;
  let fixture: ComponentFixture<WebcamUmbriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamUmbriaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamUmbriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
