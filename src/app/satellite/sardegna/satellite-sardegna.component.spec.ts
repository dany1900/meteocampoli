import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SatelliteSardegnaComponent} from './satellite-sardegna.component';

describe('SatelliteSudComponent', () => {
  let component: SatelliteSardegnaComponent;
  let fixture: ComponentFixture<SatelliteSardegnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SatelliteSardegnaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatelliteSardegnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
