import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatiAttualiComponent } from './dati-attuali.component';

describe('DatiAttualiComponent', () => {
  let component: DatiAttualiComponent;
  let fixture: ComponentFixture<DatiAttualiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatiAttualiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatiAttualiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
