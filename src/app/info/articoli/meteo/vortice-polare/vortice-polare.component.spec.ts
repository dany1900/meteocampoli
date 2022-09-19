import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VorticePolareComponent} from './vortice-polare.component';

describe('InquinamentoRimediComponent', () => {
  let component: VorticePolareComponent;
  let fixture: ComponentFixture<VorticePolareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VorticePolareComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VorticePolareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
