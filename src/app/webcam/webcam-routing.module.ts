import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {WebcamLazioComponent} from './webcam-centro-italia/webcam-lazio/webcam-lazio.component';
import {WebcamToscanaComponent} from './webcam-centro-italia/webcam-toscana/webcam-toscana.component';
import {WebcamMarcheComponent} from './webcam-centro-italia/webcam-marche/webcam-marche.component';
import {WebcamAbruzzoComponent} from './webcam-centro-italia/webcam-abruzzo/webcam-abruzzo.component';
import {WebcamMoliseComponent} from './webcam-centro-italia/webcam-molise/webcam-molise.component';
import {WebcamUmbriaComponent} from './webcam-centro-italia/webcam-umbria/webcam-umbria.component';
import {TabWebcamComponent} from './tab-webcam/tab-webcam.component';
import {ImmaginiComponent} from './immagini/immagini.component';
import {TabSudWebcamComponent} from './tab-sud-webcam/tab-sud-webcam.component';
import {WebcamSudComponent} from './webcam-sud-italia/webcam-sud/webcam-sud.component';
import {WebcamIsoleComponent} from './webcam-sud-italia/webcam-isole/webcam-isole.component';
import {TabNordWebcamComponent} from './tab-nord-webcam/tab-nord-webcam.component';
import {WebcamNordEstComponent} from './webcam-nord-italia/webcam-nord-est/webcam-nord-est.component';
import {WebcamNordOvestComponent} from './webcam-nord-italia/webcam-nord-ovest/webcam-nord-ovest.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: 'immagini',
            component: ImmaginiComponent,
          },
          {
            path: 'montagna',
            component: TabWebcamComponent,
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
              {
                path: 'sud',
                component: TabSudWebcamComponent,
              },
              {
                path: 'nord',
                component: TabNordWebcamComponent,
              },
              {
                path: 'nord-est',
                component: WebcamNordEstComponent,
              },
              {
                path: 'nord-ovest',
                component: WebcamNordOvestComponent,
              },
              {
                path: 'sud-italia',
                component: WebcamSudComponent,
              },
              {
                path: 'isole',
                component: WebcamIsoleComponent,
              },
            ]
          },
          {
            path: 'limitrofe',
            component: TabWebcamComponent,
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
