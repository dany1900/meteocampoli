import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RosaVentiComponent} from './rosa-venti.component';

describe('InquinamentoRimediComponent', () => {
  let component: RosaVentiComponent;
  let fixture: ComponentFixture<RosaVentiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RosaVentiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosaVentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
