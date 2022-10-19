import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabIsoleWebcamComponent} from './tab-isole-webcam.component';

describe('TabWebcamComponent', () => {
  let component: TabIsoleWebcamComponent;
  let fixture: ComponentFixture<TabIsoleWebcamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabIsoleWebcamComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabIsoleWebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
