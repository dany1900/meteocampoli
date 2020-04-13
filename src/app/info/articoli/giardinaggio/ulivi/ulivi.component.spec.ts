import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UliviComponent} from './ulivi.component';

describe('InquinamentoRimediComponent', () => {
  let component: UliviComponent;
  let fixture: ComponentFixture<UliviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UliviComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UliviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
