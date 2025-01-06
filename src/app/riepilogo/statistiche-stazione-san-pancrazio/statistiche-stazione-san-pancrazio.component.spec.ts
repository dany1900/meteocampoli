import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StatisticheStazioneSanPancrazioComponent} from './statistiche-stazione-san-pancrazio.component';

describe('StatisticheStazionePratoComponent', () => {
  let component: StatisticheStazioneSanPancrazioComponent;
  let fixture: ComponentFixture<StatisticheStazioneSanPancrazioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticheStazioneSanPancrazioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticheStazioneSanPancrazioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
