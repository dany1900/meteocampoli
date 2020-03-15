import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SatelliteProtezioneCivileComponent} from './satellite-protezione-civile.component';

describe('SatelliteNordComponent', () => {
  let component: SatelliteProtezioneCivileComponent;
  let fixture: ComponentFixture<SatelliteProtezioneCivileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SatelliteProtezioneCivileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatelliteProtezioneCivileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
