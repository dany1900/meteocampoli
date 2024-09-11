import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StatisticheStazionePratoComponent} from './statistiche-stazione-prato.component';

describe('StatisticheStazionePratoComponent', () => {
  let component: StatisticheStazionePratoComponent;
  let fixture: ComponentFixture<StatisticheStazionePratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticheStazionePratoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticheStazionePratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
