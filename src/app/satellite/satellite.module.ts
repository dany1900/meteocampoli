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


@NgModule({
  imports: [
    SatelliteRoutingModule,
    SharedModule
  ],

  declarations: [
    SatelliteProtezioneCivileComponent,
    SatelliteSudComponent,
    SatelliteNordComponent,
    SatelliteGeneraleComponent,
    SatelliteCentroComponent,
    TabSatelliteComponent,
    SatelliteComponent
  ],
  exports: []
})
export class SatelliteModule {

  constructor() {
  }

}
