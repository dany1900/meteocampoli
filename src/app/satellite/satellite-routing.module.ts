import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TabSatelliteComponent} from './tab-satellite/tab-satellite.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: 'generale',
            component: TabSatelliteComponent,
            data: {
              title: 'Radar Precipitazioni - Satellite Meteo'
            }
          },
          {
            path: 'nord-italia',
            component: TabSatelliteComponent,
            data: {
              title: 'Radar Precipitazioni Nord Italia - Satellite Meteo'
            }
          },
          {
            path: 'centro-italia',
            component: TabSatelliteComponent,
            data: {
              title: 'Radar Precipitazioni Centro Italia - Satellite Meteo'
            }
          },
          {
            path: 'sud-italia',
            component: TabSatelliteComponent,
            data: {
              title: 'Radar Precipitazioni Sud Italia - Satellite Meteo'
            }
          },
          {
            path: 'europa',
            component: TabSatelliteComponent,
            data: {
              title: 'Satellite Europa - Radar Precipitazioni'
            }
          },
          {
            path: 'italia',
            component: TabSatelliteComponent,
            data: {
              title: 'Radar Precipitazioni Italia - Satellite Meteo'
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
