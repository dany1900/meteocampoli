import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NoccioloComponent} from './nocciolo.component';

describe('InquinamentoRimediComponent', () => {
  let component: NoccioloComponent;
  let fixture: ComponentFixture<NoccioloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoccioloComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoccioloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
