import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SatTabComponent} from './sat-tab.component';

describe('TabComponent', () => {
  let component: SatTabComponent;
  let fixture: ComponentFixture<SatTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SatTabComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
