import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmbriaComponent } from './umbria.component';

describe('UmbriaComponent', () => {
  let component: UmbriaComponent;
  let fixture: ComponentFixture<UmbriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmbriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmbriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
