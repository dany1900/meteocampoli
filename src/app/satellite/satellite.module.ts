import {NgModule} from '@angular/core';
import {SatelliteProtezioneCivileComponent} from './protezione-civile/satellite-protezione-civile.component';
import {SatelliteSudComponent} from './sud-italia/satellite-sud.component';
import {SatelliteNordComponent} from './nord-italia/satellite-nord.component';
import {SatelliteGeneraleComponent} from './generale/satellite-generale.component';
import {SatelliteCentroComponent} from './centro-italia/satellite-centro.component';
import {TabSatelliteComponent} from './tab-satellite/tab-satellite.component';
import {SatelliteRoutingModule} from './satellite-routing.module';
import {SharedModule} from '../shared/shared.module';
import {SatelliteComponent} from './satellite.component';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxSpinnerModule} from 'ngx-spinner';
import {SatelliteTestComponent} from './satellite-test/satellite-test.component';


@NgModule({
  imports: [
    SatelliteRoutingModule,
    SharedModule,
    CommonModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule
  ],

  declarations: [
    SatelliteProtezioneCivileComponent,
    SatelliteSudComponent,
    SatelliteNordComponent,
    SatelliteGeneraleComponent,
    SatelliteCentroComponent,
    TabSatelliteComponent,
    SatelliteComponent,
    SatelliteTestComponent
  ],
  exports: []
})
export class SatelliteModule {

  constructor() {
  }

}
