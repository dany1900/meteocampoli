import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StratwarmingComponent} from './stratwarming.component';

describe('InquinamentoRimediComponent', () => {
  let component: StratwarmingComponent;
  let fixture: ComponentFixture<StratwarmingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StratwarmingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StratwarmingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
