import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamBasilicataComponent} from './webcam-basilicata.component';

describe('SudItaliaComponent', () => {
  let component: WebcamBasilicataComponent;
  let fixture: ComponentFixture<WebcamBasilicataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamBasilicataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamBasilicataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
