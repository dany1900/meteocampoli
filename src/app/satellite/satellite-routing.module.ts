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
              title: 'Satellite Metereologico - Radar Precipitazioni  - Meteo Campoli'
            }
          },
          {
            path: 'nord-italia',
            component: TabSatelliteComponent,
            data: {
              title: 'Satellite Nord Italia - Radar Precipitazioni  - Meteo Campoli'
            }
          },
          {
            path: 'centro-italia',
            component: TabSatelliteComponent,
            data: {
              title: 'Satellite Centro Italia - Radar Precipitazioni  - Meteo Campoli'
            }
          },
          {
            path: 'sud-italia',
            component: TabSatelliteComponent,
            data: {
              title: 'Satellite Sud Italia - Radar Precipitazioni  - Meteo Campoli'
            }
          },
          {
            path: 'test',
            component: TabSatelliteComponent,
            data: {
              title: 'Satellite Test Italia - Radar Precipitazioni  - Meteo Campoli'
            }
          },
          {
            path: 'italia',
            component: TabSatelliteComponent,
            data: {
              title: 'Satellite Italia - Radar Precipitazioni  - Meteo Campoli'
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
