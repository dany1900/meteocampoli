import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamLatinaComponent} from './webcam-latina.component';

describe('WebcamLatinaComponent', () => {
  let component: WebcamLatinaComponent;
  let fixture: ComponentFixture<WebcamLatinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamLatinaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamLatinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
