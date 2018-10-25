import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitrofeComponent } from './webcamLimitrofe.component';

describe('LimitrofeComponent', () => {
  let component: LimitrofeComponent;
  let fixture: ComponentFixture<LimitrofeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitrofeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitrofeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
