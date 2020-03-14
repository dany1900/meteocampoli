import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisioniComponent } from './previsioni.component';

describe('PrevisioniComponent', () => {
  let component: PrevisioniComponent;
  let fixture: ComponentFixture<PrevisioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevisioniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevisioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
