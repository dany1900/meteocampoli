import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {WebcamLazioComponent} from './webcam-centro-italia/webcam-lazio/webcam-lazio.component';
import {WebcamToscanaComponent} from './webcam-centro-italia/webcam-toscana/webcam-toscana.component';
import {WebcamMarcheComponent} from './webcam-centro-italia/webcam-marche/webcam-marche.component';
import {WebcamAbruzzoComponent} from './webcam-centro-italia/webcam-abruzzo/webcam-abruzzo.component';
import {WebcamMoliseComponent} from './webcam-centro-italia/webcam-molise/webcam-molise.component';
import {WebcamUmbriaComponent} from './webcam-centro-italia/webcam-umbria/webcam-umbria.component';
import {TabImmagginiWebcamComponent} from '../tab/tab-immaggini-webcam/tab-immaggini-webcam.component';


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
            data: {
              title: 'Immagini e WebCam - Meteo Campoli'
            }
          },
          {
            path: 'montagna',
            component: TabImmagginiWebcamComponent,
            data: {
              title: 'WebCam Montagna Centro Italia - Meteo Campoli'
            }
          },
          {
            path: 'limitrofe',
            component: TabImmagginiWebcamComponent,
            data: {
              title: 'Webcam Valle di Comino - Frosinone - Meteo Campoli'
            }
          },
          {
            path: 'montagna/lazio',
            component: WebcamLazioComponent,
            data: {
              title: 'WebCam Lazio Montagna - Meteo Campoli'
            }
          },
          {
            path: 'montagna/abruzzo',
            component: WebcamAbruzzoComponent,
            data: {
              title: 'WebCam Abruzzo Montagna - Meteo Campoli'
            }
          },
          {
            path: 'montagna/molise',
            component: WebcamMoliseComponent,
            data: {
              title: 'WebCam Molise Montagna - Meteo Campoli'
            }
          },
          {
            path: 'montagna/umbria',
            component: WebcamUmbriaComponent,
            data: {
              title: 'WebCam Umbria Montagna - Meteo Campoli'
            }
          },
          {
            path: 'montagna/marche',
            component: WebcamMarcheComponent,
            data: {
              title: 'WebCam Marche Montagna - Meteo Campoli'
            }
          },
          {
            path: 'montagna/toscana',
            component: WebcamToscanaComponent,
            data: {
              title: 'WebCam Toscana Montagna - Meteo Campoli'
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

export class WebcamRoutingModule {
}
