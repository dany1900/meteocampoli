import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TabSatelliteComponent} from './tab-satellite/tab-satellite.component';
import {TabSatelliteEsteroComponent} from './tab-satellite-estero/tab-satellite-estero.component';
import {SatelliteGeneraleComponent} from './generale/satellite-generale.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TabSatelliteComponent,
        children: [
          {
            path: 'generale',
            data: {
              title: 'Radar Precipitazioni - Satellite Meteo'
            }
          },
          {
            path: 'nord-italia',
            data: {
              title: 'Radar Precipitazioni Nord Italia - Satellite Meteo'
            }
          },
          {
            path: 'centro-italia',
            data: {
              title: 'Radar Precipitazioni Centro Italia - Satellite Meteo'
            }
          },
          {
            path: 'sud-italia',
            data: {
              title: 'Radar Precipitazioni Sud Italia - Satellite Meteo'
            }
          },
          {
            path: 'europa',
            data: {
              title: 'Satellite Europa - Radar Precipitazioni'
            }
          },
          {
            path: 'italia',
            data: {
              title: 'Radar Precipitazioni Italia - Satellite Meteo'
            }
          },
          {
            path: 'estero',
            component: TabSatelliteEsteroComponent,
            data: {
              title: 'Radar Precipitazioni Estero - Satellite Meteo'
            }
          },
          {
            path: 'europa',
            data: {
              title: 'Radar Precipitazioni Europa - Satellite Meteo'
            }
          },
          {
            path: 'mondo',
            data: {
              title: 'Radar Precipitazioni Mondo - Satellite Meteo'
            }
          },
        ],
      },
    ]),
  ],
  exports: [
    RouterModule
  ]
})

export class SatelliteRoutingModule {
}
