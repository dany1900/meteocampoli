import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatelliteNordComponent } from './satellite-nord.component';

describe('SatelliteNordComponent', () => {
  let component: SatelliteNordComponent;
  let fixture: ComponentFixture<SatelliteNordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatelliteNordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatelliteNordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
