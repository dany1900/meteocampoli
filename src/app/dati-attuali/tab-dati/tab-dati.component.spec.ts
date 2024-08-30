import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabDatiComponent} from './tab-dati.component';

describe('TabGroupComponent', () => {
  let component: TabDatiComponent;
  let fixture: ComponentFixture<TabDatiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabDatiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabDatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
