import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StazioniBasilicataComponent} from './stazioni-basilicata.component';

describe('AbruzzoComponent', () => {
  let component: StazioniBasilicataComponent;
  let fixture: ComponentFixture<StazioniBasilicataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StazioniBasilicataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniBasilicataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
