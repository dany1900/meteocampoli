import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {WebcamLazioComponent} from './webcam-centro-italia/webcam-lazio/webcam-lazio.component';
import {WebcamToscanaComponent} from './webcam-centro-italia/webcam-toscana/webcam-toscana.component';
import {WebcamMarcheComponent} from './webcam-centro-italia/webcam-marche/webcam-marche.component';
import {WebcamAbruzzoComponent} from './webcam-centro-italia/webcam-abruzzo/webcam-abruzzo.component';
import {WebcamMoliseComponent} from './webcam-centro-italia/webcam-molise/webcam-molise.component';
import {WebcamUmbriaComponent} from './webcam-centro-italia/webcam-umbria/webcam-umbria.component';
import {TabImmagginiWebcamComponent} from './tab-immaggini-webcam/tab-immaggini-webcam.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TabImmagginiWebcamComponent,
        children: [
          {
            path: 'immagini',
            component: TabImmagginiWebcamComponent,
          },
          {
            path: 'montagna',
            component: TabImmagginiWebcamComponent,
          },
          {
            path: 'limitrofe',
            component: TabImmagginiWebcamComponent,
          },
          {
            path: 'montagna/lazio',
            component: WebcamLazioComponent,
          },
          {
            path: 'montagna/abruzzo',
            component: WebcamAbruzzoComponent,
          },
          {
            path: 'montagna/molise',
            component: WebcamMoliseComponent,
          },
          {
            path: 'montagna/umbria',
            component: WebcamUmbriaComponent,
          },
          {
            path: 'montagna/marche',
            component: WebcamMarcheComponent,
          },
          {
            path: 'montagna/toscana',
            component: WebcamToscanaComponent,
          },
        ],
      },
    ]),
  ],
  exports: [
    RouterModule
  ]
})

export class WebcamRoutingModule {
}
