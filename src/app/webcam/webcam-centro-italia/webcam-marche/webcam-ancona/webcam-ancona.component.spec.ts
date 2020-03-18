import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamAnconaComponent} from './webcam-ancona.component';

describe('WebcamAnconaComponent', () => {
  let component: WebcamAnconaComponent;
  let fixture: ComponentFixture<WebcamAnconaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamAnconaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamAnconaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
