import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SudItaliaComponent } from './sud-italia.component';

describe('SudItaliaComponent', () => {
  let component: SudItaliaComponent;
  let fixture: ComponentFixture<SudItaliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SudItaliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SudItaliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
