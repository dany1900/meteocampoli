import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamIserniaComponent } from './webcam-isernia.component';

describe('IserniaComponent', () => {
  let component: WebcamIserniaComponent;
  let fixture: ComponentFixture<WebcamIserniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcamIserniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamIserniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
