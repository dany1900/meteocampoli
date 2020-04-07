import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GiardinaggioComponent} from './giardinaggio.component';

describe('CuriositaComponent', () => {
  let component: GiardinaggioComponent;
  let fixture: ComponentFixture<GiardinaggioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GiardinaggioComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiardinaggioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
