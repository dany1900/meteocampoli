import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TabInfoComponent} from './tab-info/tab-info.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TabInfoComponent,
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
