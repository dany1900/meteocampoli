import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TerremotiMondoComponent} from './terremoti-mondo.component';

describe('TerremotiMondoComponent', () => {
  let component: TerremotiMondoComponent;
  let fixture: ComponentFixture<TerremotiMondoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TerremotiMondoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerremotiMondoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
