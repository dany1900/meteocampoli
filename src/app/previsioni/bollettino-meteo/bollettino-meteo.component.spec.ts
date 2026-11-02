import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BollettinoMeteoComponent} from './bollettino-meteo.component';

describe('TemperatureMareComponent', () => {
  let component: BollettinoMeteoComponent;
  let fixture: ComponentFixture<BollettinoMeteoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BollettinoMeteoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BollettinoMeteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
