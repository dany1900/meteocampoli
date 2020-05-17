import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OndataCaldo2017Component} from './ondata-caldo-2017.component';

describe('InquinamentoRimediComponent', () => {
  let component: OndataCaldo2017Component;
  let fixture: ComponentFixture<OndataCaldo2017Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OndataCaldo2017Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OndataCaldo2017Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
