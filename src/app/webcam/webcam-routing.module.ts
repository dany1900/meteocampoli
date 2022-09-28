import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TabWebcamComponent} from './tab-webcam/tab-webcam.component';
import {ImmaginiComponent} from './immagini/immagini.component';


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
            children: [
              {
                path: 'lazio',
                component: TabWebcamComponent,
              },
              {
                path: 'abruzzo',
                component: TabWebcamComponent,
              },
              {
                path: 'molise',
                component: TabWebcamComponent,
              },
              {
                path: 'umbria',
                component: TabWebcamComponent,
              },
              {
                path: 'marche',
                component: TabWebcamComponent,
              },
              {
                path: 'toscana',
                component: TabWebcamComponent,
              },
              {
                path: 'nord-est',
                component: TabWebcamComponent,
              },
              {
                path: 'nord-ovest',
                component: TabWebcamComponent,
              },
              {
                path: 'emilia-romagna',
                component: TabWebcamComponent,
              },
              {
                path: 'sud-italia',
                component: TabWebcamComponent,
              },
              {
                path: 'sardegna',
                component: TabWebcamComponent,
              },
              {
                path: 'sicilia',
                component: TabWebcamComponent,
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
