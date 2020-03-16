import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SatelliteCentroComponent} from './satellite-centro.component';

describe('SatelliteCentroComponent', () => {
  let component: SatelliteCentroComponent;
  let fixture: ComponentFixture<SatelliteCentroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SatelliteCentroComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatelliteCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
