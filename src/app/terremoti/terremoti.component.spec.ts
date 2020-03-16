import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TerremotiComponent} from './terremoti.component';

describe('TerremotiComponent', () => {
  let component: TerremotiComponent;
  let fixture: ComponentFixture<TerremotiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TerremotiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerremotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
