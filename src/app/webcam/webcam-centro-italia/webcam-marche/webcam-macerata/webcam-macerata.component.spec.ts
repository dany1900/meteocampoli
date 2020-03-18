import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamMacerataComponent} from './webcam-macerata.component';

describe('WebcamMacerataComponent', () => {
  let component: WebcamMacerataComponent;
  let fixture: ComponentFixture<WebcamMacerataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamMacerataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamMacerataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
