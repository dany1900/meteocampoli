import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShinystatComponent } from './shinystat.component';

describe('ShinystatComponent', () => {
  let component: ShinystatComponent;
  let fixture: ComponentFixture<ShinystatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShinystatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShinystatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
