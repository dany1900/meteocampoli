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
