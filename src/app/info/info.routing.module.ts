import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TabStazioniComponent} from '../tab/tab-stazioni/tab-stazioni.component';
import {TabInfoComponent} from '../tab/tab-info/tab-info.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TabStazioniComponent,
        children: [
          {
            path: 'info',
            component: TabInfoComponent,
            data: {
              title: 'Info e Curiosita - Qualita Aria - Orari Alba Tramonto'
            }
          },
          {
            path: 'articoli',
            component: TabInfoComponent,
            data: {
              title: 'Articoli - Meteo Campoli'
            }
          },
          {
            path: 'curiosita',
            component: TabInfoComponent,
            data: {
              title: 'Curiosita - Meteo Campoli'
            }
          },
          {
            path: 'ieffemeridi',
            component: TabInfoComponent,
            data: {
              title: 'Orari Alba Tramonto - Meteo Campoli'
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

export class InfoRoutingModule {
}
