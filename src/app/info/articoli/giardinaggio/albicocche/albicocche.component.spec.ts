import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlbicoccheComponent} from './albicocche.component';

describe('InquinamentoRimediComponent', () => {
  let component: AlbicoccheComponent;
  let fixture: ComponentFixture<AlbicoccheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbicoccheComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbicoccheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
