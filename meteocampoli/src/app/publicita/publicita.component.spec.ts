import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicitaComponent } from './publicita.component';

describe('PublicitaComponent', () => {
  let component: PublicitaComponent;
  let fixture: ComponentFixture<PublicitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
