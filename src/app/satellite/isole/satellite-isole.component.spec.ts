import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SatelliteIsoleComponent} from './satellite-isole.component';

describe('SatelliteSudComponent', () => {
  let component: SatelliteIsoleComponent;
  let fixture: ComponentFixture<SatelliteIsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SatelliteIsoleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatelliteIsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
