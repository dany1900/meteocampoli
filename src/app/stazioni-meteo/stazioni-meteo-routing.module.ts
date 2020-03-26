import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TabStazioniComponent} from '../tab/tab-stazioni/tab-stazioni.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TabStazioniComponent,
        children: [
          {
            path: 'generale',
            component: TabStazioniComponent,
            data: {
              title: 'Stazioni Meteo Limitrofe - Dati - Meteo Campoli'
            }
          },
          {
            path: 'lazio',
            component: TabStazioniComponent,
            data: {
              title: 'Stazioni Meteo Lazio - Dati - Meteo Campoli'
            }
          },
          {
            path: 'abruzzo',
            component: TabStazioniComponent,
            data: {
              title: 'Stazioni Meteo Abruzzo - Dati - Meteo Campoli'
            }
          },
          {
            path: 'molise',
            component: TabStazioniComponent,
            data: {
              title: 'Stazioni Meteo Molise - Dati - Meteo Campoli'
            }
          },
          {
            path: 'rete-meteo',
            component: TabStazioniComponent,
            data: {
              title: 'Stazioni Meteo Rete Meteo - Dati - Meteo Campoli',

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

export class StazioniMeteoRoutingModule {
}
