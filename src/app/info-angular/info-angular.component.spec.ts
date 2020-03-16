import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InfoAngularComponent} from './info-angular.component';

describe('InfoAngularComponent', () => {
  let component: InfoAngularComponent;
  let fixture: ComponentFixture<InfoAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfoAngularComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
