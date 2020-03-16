import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CentroItaliaComponent} from './centro-italia.component';

describe('CentroItaliaComponent', () => {
  let component: CentroItaliaComponent;
  let fixture: ComponentFixture<CentroItaliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CentroItaliaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroItaliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
