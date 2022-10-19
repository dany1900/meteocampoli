import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamCampaniaComponent} from './webcam-campania.component';

describe('SudItaliaComponent', () => {
  let component: WebcamCampaniaComponent;
  let fixture: ComponentFixture<WebcamCampaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamCampaniaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamCampaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
