import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StazionePratoComponent} from './stazione-prato.component';

describe('StazionePratoComponent', () => {
  let component: StazionePratoComponent;
  let fixture: ComponentFixture<StazionePratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StazionePratoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StazionePratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
