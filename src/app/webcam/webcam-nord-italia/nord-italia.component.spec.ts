import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NordItaliaComponent} from './nord-italia.component';

describe('NordItaliaComponent', () => {
  let component: NordItaliaComponent;
  let fixture: ComponentFixture<NordItaliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NordItaliaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NordItaliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
