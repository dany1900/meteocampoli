import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamMontagnaComponent } from './webcam-montagna.component';

describe('WebcamMontagnaComponent', () => {
  let component: WebcamMontagnaComponent;
  let fixture: ComponentFixture<WebcamMontagnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcamMontagnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamMontagnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
