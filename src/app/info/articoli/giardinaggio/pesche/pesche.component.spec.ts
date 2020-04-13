import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PescheComponent} from './pesche.component';

describe('InquinamentoRimediComponent', () => {
  let component: PescheComponent;
  let fixture: ComponentFixture<PescheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PescheComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PescheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
