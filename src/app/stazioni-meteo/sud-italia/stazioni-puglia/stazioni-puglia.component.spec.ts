import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StazioniPugliaComponent} from './stazioni-puglia.component';

describe('AbruzzoComponent', () => {
  let component: StazioniPugliaComponent;
  let fixture: ComponentFixture<StazioniPugliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StazioniPugliaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StazioniPugliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
