import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InquinamentoRimediComponent} from './inquinamento-rimedi.component';

describe('InquinamentoRimediComponent', () => {
  let component: InquinamentoRimediComponent;
  let fixture: ComponentFixture<InquinamentoRimediComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InquinamentoRimediComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquinamentoRimediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
