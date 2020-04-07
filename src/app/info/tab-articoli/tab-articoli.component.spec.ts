import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabArticoliComponent} from './tab-articoli.component';

describe('TabInfoComponent', () => {
  let component: TabArticoliComponent;
  let fixture: ComponentFixture<TabArticoliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabArticoliComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabArticoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
