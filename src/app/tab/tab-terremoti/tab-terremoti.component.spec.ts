import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabTerremotiComponent} from './tab-terremoti.component';

describe('TabWebcamComponent', () => {
  let component: TabTerremotiComponent;
  let fixture: ComponentFixture<TabTerremotiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabTerremotiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabTerremotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
