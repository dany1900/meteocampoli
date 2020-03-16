import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SatelliteSudComponent} from './satellite-sud.component';

describe('SatelliteSudComponent', () => {
  let component: SatelliteSudComponent;
  let fixture: ComponentFixture<SatelliteSudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SatelliteSudComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatelliteSudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
