import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UlivoComponent} from './ulivo.component';

describe('InquinamentoRimediComponent', () => {
  let component: UlivoComponent;
  let fixture: ComponentFixture<UlivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UlivoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UlivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
