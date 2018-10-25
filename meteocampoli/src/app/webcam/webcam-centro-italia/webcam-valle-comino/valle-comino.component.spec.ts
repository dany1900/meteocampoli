import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValleCominoComponent } from './valle-comino.component';

describe('ValleCominoComponent', () => {
  let component: ValleCominoComponent;
  let fixture: ComponentFixture<ValleCominoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValleCominoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValleCominoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
