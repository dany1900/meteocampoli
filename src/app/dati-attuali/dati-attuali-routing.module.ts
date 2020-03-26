import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DatiAttualiComponent} from './dati-attuali.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DatiAttualiComponent,
        children: [
          {
            path: 'dati-attuali',
            component: DatiAttualiComponent,
            data: {
              title: 'Meteo Campoli - Monitoraggio Meteo'

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

export class DatiAttualiRoutingModule {
}
