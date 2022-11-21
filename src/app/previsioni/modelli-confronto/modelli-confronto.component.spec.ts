import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModelliConfrontoComponent} from './modelli-confronto.component';

describe('PrevisioniComponent', () => {
  let component: ModelliConfrontoComponent;
  let fixture: ComponentFixture<ModelliConfrontoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelliConfrontoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelliConfrontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
