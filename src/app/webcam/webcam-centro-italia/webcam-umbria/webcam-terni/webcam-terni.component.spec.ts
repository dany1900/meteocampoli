import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamTerniComponent} from './webcam-terni.component';

describe('WebcamTerniComponent', () => {
  let component: WebcamTerniComponent;
  let fixture: ComponentFixture<WebcamTerniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamTerniComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamTerniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
