import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabSatelliteSudComponent} from './tab-satellite-sud.component';

describe('TabWebcamComponent', () => {
  let component: TabSatelliteSudComponent;
  let fixture: ComponentFixture<TabSatelliteSudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabSatelliteSudComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSatelliteSudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
