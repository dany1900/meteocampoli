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
        children: [
          {
            path: 'immagini',
            component: TabImmagginiWebcamComponent,
          },
          {
            path: 'montagna',
            component: TabImmagginiWebcamComponent,
            children: [
              {
                path: 'lazio',
                component: WebcamLazioComponent,
              },
              {
                path: 'abruzzo',
                component: WebcamAbruzzoComponent,
              },
              {
                path: 'molise',
                component: WebcamMoliseComponent,
              },
              {
                path: 'umbria',
                component: WebcamUmbriaComponent,
              },
              {
                path: 'marche',
                component: WebcamMarcheComponent,
              },
              {
                path: 'toscana',
                component: WebcamToscanaComponent,
              },
            ]
          },
          {
            path: 'limitrofe',
            component: TabImmagginiWebcamComponent,
          },
          {
            path: 'nord-italia',
            component: TabImmagginiWebcamComponent,
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
