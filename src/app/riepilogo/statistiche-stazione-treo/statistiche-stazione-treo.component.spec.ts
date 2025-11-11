import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StatisticheStazioneTreoComponent} from './statistiche-stazione-treo.component';

describe('StatisticheStazionePratoComponent', () => {
  let component: StatisticheStazioneTreoComponent;
  let fixture: ComponentFixture<StatisticheStazioneTreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticheStazioneTreoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticheStazioneTreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
