import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TabInfoComponent} from './tab-info/tab-info.component';
import {TabArticoliComponent} from './tab-articoli/tab-articoli.component';
import {InquinamentoRimediComponent} from './articoli/inquinamento-rimedi/inquinamento-rimedi.component';


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
            path: 'curiosita',
            component: TabInfoComponent,
            data: {
              title: 'Curiosita - Meteo Campoli'
            }
          },
          {
            path: 'effemeridi',
            component: TabInfoComponent,
            data: {
              title: 'Orari Alba Tramonto - Meteo Campoli'
            }
          },
          {
            path: 'articoli',
            component: TabInfoComponent,
            data: {
              title: 'Articoli - Meteo Campoli'
            },
            children: [
              {
                path: 'inquinamento-rimedi',
                component: InquinamentoRimediComponent,
                data: {
                  title: 'Articolo Inquinamento - Meteo Campoli'
                }
              },
              {
                path: 'giardinaggio/ulivi',
                component: TabArticoliComponent,
                data: {
                  title: 'Articolo Ulivi - Meteo Campoli'
                }
              },
            ]
          }
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
