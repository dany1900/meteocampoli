import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabSatelliteComponent} from './tab-satellite.component';

describe('TabGroupComponent', () => {
  let component: TabSatelliteComponent;
  let fixture: ComponentFixture<TabSatelliteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabSatelliteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSatelliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
