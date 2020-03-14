import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToscanaComponent } from './toscana.component';

describe('ToscanaComponent', () => {
  let component: ToscanaComponent;
  let fixture: ComponentFixture<ToscanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToscanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToscanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
