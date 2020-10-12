import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebCamLimitrofeComponent} from './webcamLimitrofe.component';

describe('LimitrofeComponent', () => {
  let component: WebCamLimitrofeComponent;
  let fixture: ComponentFixture<WebCamLimitrofeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebCamLimitrofeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebCamLimitrofeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
