import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabWebcamComponent } from './tab-webcam.component';

describe('TabWebcamComponent', () => {
  let component: TabWebcamComponent;
  let fixture: ComponentFixture<TabWebcamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabWebcamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabWebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
