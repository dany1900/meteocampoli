import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViteComponent} from './vite.component';

describe('InquinamentoRimediComponent', () => {
  let component: ViteComponent;
  let fixture: ComponentFixture<ViteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
