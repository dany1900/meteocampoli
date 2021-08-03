import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DatiAttualiComponent} from './dati-attuali.component';
import {RadioSondaggiComponent} from './radio-sondaggi/radio-sondaggi.component';
import {IncendiComponent} from './incendi/incendi.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: '',
            component: DatiAttualiComponent,
            data: {
              title: 'Meteo Campoli - Monitoraggio Meteo',
              description: 'Tutte le stazioni locali e del centro italia visualizzabili con comodi script.Completo di Mappe, Radar, WebCam e Previsioni. Il miglior sito meteo di monitoraggio.',
              ogUrl: 'www.meteocampoli.altervista.org'
            },
          },
          {
            path: 'radio-sondaggi',
            component: RadioSondaggiComponent,
            data: {
              title: 'RadioSondaggi - Meteo Campoli',
            },
          },
          {
            path: 'incendi',
            component: IncendiComponent,
            data: {
              title: 'Mappa Incendi Live - Meteo Campoli',
            },
          },
        ],
      },
    ]),
  ],
  exports: [
    RouterModule
  ]
})

export class DatiAttualiRoutingModule {
}
