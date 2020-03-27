import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TabSatelliteComponent} from './tab-satellite/tab-satellite.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TabSatelliteComponent,
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
            path: 'satellite-rete-nazionale',
            component: TabSatelliteComponent,
            data: {
              title: 'Rete Meteo  - Mappa Stazioni Meteo  - Meteo Campoli'
            }
          },
          {
            path: 'protezione-civile',
            component: TabSatelliteComponent,
            data: {
              title: 'Satellite Protezione Civile - Radar Precipitazioni  - Meteo Campoli'
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
