import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamAquilaComponent } from './webcam-aquila.component';

describe('WebcamAquilaComponent', () => {
  let component: WebcamAquilaComponent;
  let fixture: ComponentFixture<WebcamAquilaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcamAquilaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamAquilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
