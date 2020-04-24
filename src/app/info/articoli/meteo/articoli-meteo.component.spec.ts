import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArticoliMeteoComponent} from './articoli-meteo.component';

describe('ArticoliComponent', () => {
  let component: ArticoliMeteoComponent;
  let fixture: ComponentFixture<ArticoliMeteoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticoliMeteoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticoliMeteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
