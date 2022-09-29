import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabSudStazioniComponent} from './tab-sud-stazioni.component';

describe('TabWebcamComponent', () => {
  let component: TabSudStazioniComponent;
  let fixture: ComponentFixture<TabSudStazioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabSudStazioniComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSudStazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
