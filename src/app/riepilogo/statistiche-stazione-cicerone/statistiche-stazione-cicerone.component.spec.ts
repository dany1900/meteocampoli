import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StatisticheStazioneCiceroneComponent} from './statistiche-stazione-cicerone.component';

describe('StatisticheStazionePratoComponent', () => {
  let component: StatisticheStazioneCiceroneComponent;
  let fixture: ComponentFixture<StatisticheStazioneCiceroneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticheStazioneCiceroneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticheStazioneCiceroneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
