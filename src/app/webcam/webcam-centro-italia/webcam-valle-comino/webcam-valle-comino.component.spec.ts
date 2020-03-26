import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamValleCominoComponent} from './webcam-valle-comino.component';

describe('ValleCominoComponent', () => {
  let component: WebcamValleCominoComponent;
  let fixture: ComponentFixture<WebcamValleCominoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamValleCominoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamValleCominoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
