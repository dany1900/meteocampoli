import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CampobassoComponent} from './campobasso.component';

describe('CampobassoComponent', () => {
  let component: CampobassoComponent;
  let fixture: ComponentFixture<CampobassoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CampobassoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampobassoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
