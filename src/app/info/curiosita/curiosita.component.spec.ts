import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CuriositaComponent} from './curiosita.component';

describe('CuriositaComponent', () => {
  let component: CuriositaComponent;
  let fixture: ComponentFixture<CuriositaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CuriositaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuriositaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
