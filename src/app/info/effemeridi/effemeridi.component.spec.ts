import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EffemeridiComponent} from './effemeridi.component';

describe('EffemeridiComponent', () => {
  let component: EffemeridiComponent;
  let fixture: ComponentFixture<EffemeridiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EffemeridiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffemeridiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
