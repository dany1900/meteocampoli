import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SatelliteTestComponent} from './satellite-test.component';


describe('SatelliteCentroComponent', () => {
  let component: SatelliteTestComponent;
  let fixture: ComponentFixture<SatelliteTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SatelliteTestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatelliteTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
