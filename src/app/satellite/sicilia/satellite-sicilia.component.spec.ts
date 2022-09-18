import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SatelliteSiciliaComponent} from './satellite-sicilia.component';

describe('SatelliteSudComponent', () => {
  let component: SatelliteSiciliaComponent;
  let fixture: ComponentFixture<SatelliteSiciliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SatelliteSiciliaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatelliteSiciliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
