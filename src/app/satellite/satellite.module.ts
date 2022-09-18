import {NgModule} from '@angular/core';
import {SatelliteItaliaComponent} from './italia/satellite-italia.component';
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
import {SatelliteTestComponent} from './satellite-test/satellite-test.component';
import {SatelliteEuropaComponent} from './europa/satellite-europa.component';
import {TabSatelliteEsteroComponent} from './tab-satellite-estero/tab-satellite-estero.component';
import {SatelliteMondoComponent} from './mondo/satellite-mondo.component';
import {SatelliteSardegnaComponent} from './sardegna/satellite-sardegna.component';
import {TabSatelliteSudComponent} from './tab-satellite-sud/tab-satellite-sud.component';
import {SatelliteSiciliaComponent} from './sicilia/satellite-sicilia.component';


@NgModule({
  imports: [
    SatelliteRoutingModule,
    SharedModule,
    CommonModule,
    MatProgressSpinnerModule
  ],

  declarations: [
    SatelliteItaliaComponent,
    SatelliteSudComponent,
    SatelliteNordComponent,
    SatelliteGeneraleComponent,
    SatelliteCentroComponent,
    TabSatelliteComponent,
    TabSatelliteEsteroComponent,
    SatelliteComponent,
    SatelliteTestComponent,
    SatelliteEuropaComponent,
    SatelliteMondoComponent,
    SatelliteSardegnaComponent,
    TabSatelliteSudComponent,
    SatelliteSardegnaComponent,
    SatelliteSiciliaComponent,
  ],
  exports: []
})
export class SatelliteModule {

  constructor() {
  }

}
