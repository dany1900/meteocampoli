import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FichiComponent} from './fichi.component';

describe('InquinamentoRimediComponent', () => {
  let component: FichiComponent;
  let fixture: ComponentFixture<FichiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FichiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
