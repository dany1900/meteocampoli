import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamPescaraComponent } from './webcam-pescara.component';

describe('WebcamPescaraComponent', () => {
  let component: WebcamPescaraComponent;
  let fixture: ComponentFixture<WebcamPescaraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcamPescaraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamPescaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
