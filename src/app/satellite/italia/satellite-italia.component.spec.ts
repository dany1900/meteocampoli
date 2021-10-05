import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SatelliteItaliaComponent} from './satellite-italia.component';

describe('SatelliteNordComponent', () => {
  let component: SatelliteItaliaComponent;
  let fixture: ComponentFixture<SatelliteItaliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SatelliteItaliaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatelliteItaliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
