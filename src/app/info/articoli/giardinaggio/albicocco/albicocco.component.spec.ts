import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlbicoccoComponent} from './albicocco.component';

describe('InquinamentoRimediComponent', () => {
  let component: AlbicoccoComponent;
  let fixture: ComponentFixture<AlbicoccoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbicoccoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbicoccoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
