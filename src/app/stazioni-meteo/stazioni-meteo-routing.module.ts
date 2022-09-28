import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TabStazioniComponent} from './tab-stazioni/tab-stazioni.component';
import {TabWebcamComponent} from '../webcam/tab-webcam/tab-webcam.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: 'generale',
            component: TabStazioniComponent,
          },
          {
            path: 'lazio',
            component: TabStazioniComponent,
          },
          {
            path: 'abruzzo',
            component: TabStazioniComponent,
          },
          {
            path: 'molise',
            component: TabStazioniComponent,
          },
          {
            path: 'umbria',
            component: TabStazioniComponent,
          },
          {
            path: 'marche',
            component: TabStazioniComponent,
          },
          {
            path: 'toscana',
            component: TabStazioniComponent,
          },
          {
            path: 'nord-est',
            component: TabStazioniComponent,
          },
          {
            path: 'nord-ovest',
            component: TabStazioniComponent,
          },
          {
            path: 'emilia-romagna',
            component: TabStazioniComponent,
          },
          {
            path: 'sardegna',
            component: TabStazioniComponent,
          },
          {
            path: 'sicilia',
            component: TabStazioniComponent,
          },
          {
            path: 'sud-italia',
            component: TabStazioniComponent,
          },
          {
            path: 'sud',
            component: TabWebcamComponent,
          },
          {
            path: 'nord',
            component: TabWebcamComponent,
          },
          {
            path: 'isole',
            component: TabWebcamComponent,
          },
          {
            path: 'rete-meteo',
            component: TabStazioniComponent,
          },
        ],
      },
    ]),
  ],
  exports: [
    RouterModule
  ]
})

export class StazioniMeteoRoutingModule {
}
