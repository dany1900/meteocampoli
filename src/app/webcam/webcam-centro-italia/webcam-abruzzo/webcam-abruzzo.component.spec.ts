import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamAbruzzoComponent } from './webcam-abruzzo.component';

describe('AbruzzoComponent', () => {
  let component: WebcamAbruzzoComponent;
  let fixture: ComponentFixture<WebcamAbruzzoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcamAbruzzoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamAbruzzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
