import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamTeramoComponent} from './webcam-teramo.component';

describe('WebcamPescaraComponent', () => {
  let component: WebcamTeramoComponent;
  let fixture: ComponentFixture<WebcamTeramoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamTeramoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamTeramoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
