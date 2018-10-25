import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamMoliseComponent } from './webcam-molise.component';

describe('MoliseComponent', () => {
  let component: WebcamMoliseComponent;
  let fixture: ComponentFixture<WebcamMoliseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcamMoliseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamMoliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
