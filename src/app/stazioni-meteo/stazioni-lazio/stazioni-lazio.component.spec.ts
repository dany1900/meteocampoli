import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StazioniLazioComponent } from './stazioni-lazio.component';

describe('LazioComponent', () => {
  let component: StazioniLazioComponent;
  let fixture: ComponentFixture<StazioniLazioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StazioniLazioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniLazioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
