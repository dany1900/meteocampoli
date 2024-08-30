import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RadioSondaggiComponent} from './radio-sondaggi/radio-sondaggi.component';
import {IncendiComponent} from './incendi/incendi.component';
import {TabDatiComponent} from './tab-dati/tab-dati.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: '',
            component: TabDatiComponent,
            data: {
              title: 'Meteo Campoli - Monitoraggio Meteo',
              description: 'Tutte le stazioni locali e del centro italia visualizzabili con comodi script.Completo di Mappe, Radar, WebCam e Previsioni. Il miglior sito meteo di monitoraggio.',
              ogUrl: 'www.meteocampoli.altervista.org'
            },
          },
          {
            path: 'stazione-prato',
            component: TabDatiComponent,
            data: {
              title: 'Stazione Meteo Loc Prato - Meteo Campoli',
              description: 'Stazione meteo località prato (586mt). Tutti i dati in tempo reale e le statistiche aggiornate 24/24 della nuova stazione.',
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
