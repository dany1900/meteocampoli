import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabRiepilogoComponent} from './tab-riepilogo.component';

describe('TabGroupComponent', () => {
  let component: TabRiepilogoComponent;
  let fixture: ComponentFixture<TabRiepilogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabRiepilogoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabRiepilogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
