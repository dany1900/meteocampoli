import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TemperatureMareComponent} from './temperature-mare.component';

describe('TemperatureMareComponent', () => {
  let component: TemperatureMareComponent;
  let fixture: ComponentFixture<TemperatureMareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperatureMareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureMareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
