import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamIsoleComponent} from './webcam-isole.component';

describe('SudItaliaComponent', () => {
  let component: WebcamIsoleComponent;
  let fixture: ComponentFixture<WebcamIsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamIsoleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamIsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
