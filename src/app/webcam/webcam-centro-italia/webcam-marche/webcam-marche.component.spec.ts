import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamMarcheComponent} from './webcam-marche.component';

describe('MarcheComponent', () => {
  let component: WebcamMarcheComponent;
  let fixture: ComponentFixture<WebcamMarcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamMarcheComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
