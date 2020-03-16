import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TerremotiItaliaComponent} from './terremoti-italia.component';

describe('TerremotiItaliaComponent', () => {
  let component: TerremotiItaliaComponent;
  let fixture: ComponentFixture<TerremotiItaliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TerremotiItaliaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerremotiItaliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
