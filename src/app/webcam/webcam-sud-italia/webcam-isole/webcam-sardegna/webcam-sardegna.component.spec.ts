import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamSardegnaComponent} from './webcam-sardegna.component';

describe('SudItaliaComponent', () => {
  let component: WebcamSardegnaComponent;
  let fixture: ComponentFixture<WebcamSardegnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamSardegnaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamSardegnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
