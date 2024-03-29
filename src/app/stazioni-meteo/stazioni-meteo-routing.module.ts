import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TabStazioniComponent} from './tab-stazioni/tab-stazioni.component';


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
            path: 'campania',
            component: TabStazioniComponent,
          },
          {
            path: 'calabria',
            component: TabStazioniComponent,
          },
          {
            path: 'puglia',
            component: TabStazioniComponent,
          },
          {
            path: 'basilicata',
            component: TabStazioniComponent,
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
