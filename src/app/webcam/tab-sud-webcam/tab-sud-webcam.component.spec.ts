import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabSudWebcamComponent} from './tab-sud-webcam.component';

describe('TabWebcamComponent', () => {
  let component: TabSudWebcamComponent;
  let fixture: ComponentFixture<TabSudWebcamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabSudWebcamComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSudWebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
