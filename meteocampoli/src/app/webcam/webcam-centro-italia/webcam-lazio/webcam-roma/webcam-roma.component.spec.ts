import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamRomaComponent } from './webcam-roma.component';

describe('WebcamRomaComponent', () => {
  let component: WebcamRomaComponent;
  let fixture: ComponentFixture<WebcamRomaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcamRomaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamRomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
