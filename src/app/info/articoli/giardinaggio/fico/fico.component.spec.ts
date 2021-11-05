import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FicoComponent} from './fico.component';

describe('InquinamentoRimediComponent', () => {
  let component: FicoComponent;
  let fixture: ComponentFixture<FicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FicoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
