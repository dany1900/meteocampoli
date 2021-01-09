import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RadioSondaggiComponent} from './radio-sondaggi.component';

describe('RadiosondaggiComponent', () => {
  let component: RadioSondaggiComponent;
  let fixture: ComponentFixture<RadioSondaggiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadioSondaggiComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioSondaggiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
