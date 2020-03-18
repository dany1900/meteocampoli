import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamPesaroUrbinoComponent} from './webcam-pesaro-urbino.component';

describe('WebcamPesaroUrbinoComponent', () => {
  let component: WebcamPesaroUrbinoComponent;
  let fixture: ComponentFixture<WebcamPesaroUrbinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamPesaroUrbinoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamPesaroUrbinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
