import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NeveMontagnaComponent} from './neve-montagna.component';

describe('TemperatureMareComponent', () => {
  let component: NeveMontagnaComponent;
  let fixture: ComponentFixture<NeveMontagnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeveMontagnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeveMontagnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
