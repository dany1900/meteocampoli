import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabSatelliteEsteroComponent} from './tab-satellite-estero.component';

describe('TabWebcamComponent', () => {
  let component: TabSatelliteEsteroComponent;
  let fixture: ComponentFixture<TabSatelliteEsteroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabSatelliteEsteroComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSatelliteEsteroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
