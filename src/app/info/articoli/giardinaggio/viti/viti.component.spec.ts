import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VitiComponent} from './viti.component';

describe('InquinamentoRimediComponent', () => {
  let component: VitiComponent;
  let fixture: ComponentFixture<VitiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VitiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
