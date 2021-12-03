import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IndiciClimaticiComponent} from './indici-climatici.component';

describe('PrevisioniComponent', () => {
  let component: IndiciClimaticiComponent;
  let fixture: ComponentFixture<IndiciClimaticiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndiciClimaticiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiciClimaticiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
