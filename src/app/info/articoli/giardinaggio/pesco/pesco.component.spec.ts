import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PescoComponent} from './pesco.component';

describe('InquinamentoRimediComponent', () => {
  let component: PescoComponent;
  let fixture: ComponentFixture<PescoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PescoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PescoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
