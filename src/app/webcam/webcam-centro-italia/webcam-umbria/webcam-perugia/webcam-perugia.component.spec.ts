import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamPerugiaComponent} from './webcam-perugia.component';

describe('WebcamPerugiaComponent', () => {
  let component: WebcamPerugiaComponent;
  let fixture: ComponentFixture<WebcamPerugiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamPerugiaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamPerugiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
