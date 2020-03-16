import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabStazioniComponent} from './tab-stazioni.component';

describe('TabStazioniComponent', () => {
  let component: TabStazioniComponent;
  let fixture: ComponentFixture<TabStazioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabStazioniComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabStazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
