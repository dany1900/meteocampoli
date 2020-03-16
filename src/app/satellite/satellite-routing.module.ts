import {SatelliteCentroComponent} from "./centro-italia/satellite-centro.component";
import {SatelliteGeneraleComponent} from "./generale/satellite-generale.component";
import {SatelliteNordComponent} from "./nord-italia/satellite-nord.component";
import {SatelliteSudComponent} from "./sud-italia/satellite-sud.component";
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'satellite-generale',
        component: SatelliteGeneraleComponent
      },
      {
        path: 'satellite-centro',
        component: SatelliteCentroComponent
      },
      {
        path: 'satellite-nord',
        component: SatelliteNordComponent
      },
      {
        path: 'satellite-sud',
        component: SatelliteSudComponent
      },

    ])
  ],
  exports: [
    RouterModule
  ]
})

export class SatelliteRoutingModule {
}
