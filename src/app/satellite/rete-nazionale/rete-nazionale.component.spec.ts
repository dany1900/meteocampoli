import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReteNazionaleComponent} from './rete-nazionale.component';

describe('ReteNazionaleComponent', () => {
  let component: ReteNazionaleComponent;
  let fixture: ComponentFixture<ReteNazionaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReteNazionaleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReteNazionaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
