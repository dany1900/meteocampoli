import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AtmosferaComponent} from './atmosfera.component';

describe('InquinamentoRimediComponent', () => {
  let component: AtmosferaComponent;
  let fixture: ComponentFixture<AtmosferaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AtmosferaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmosferaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
