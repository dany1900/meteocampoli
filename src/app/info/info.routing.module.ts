import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TabInfoComponent} from './tab-info/tab-info.component';
import {InquinamentoRimediComponent} from './articoli/inquinamento-rimedi/inquinamento-rimedi.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
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
            data: {
              title: 'Articoli - Meteo Campoli',
            },
            children: [
              {
                path: 'meteo',
                component: TabInfoComponent,
                data: {
                  title: 'Articoli - meteo - Meteo Campoli',
                  breadcrumb: 'meteo'
                },
              },
              {
                path: 'meteo/inquinamento-rimedi',
                component: InquinamentoRimediComponent,
                data: {
                  title: 'Articolo Inquinamento - Meteo Campoli',
                  breadcrumb: 'inquinamento-rimedi'
                }
              },
              {
                path: 'giardinaggio',
                component: TabInfoComponent,
                data: {
                  title: 'Articoli - Giardinaggio - Meteo Campoli',
                  breadcrumb: 'giardinaggio'
                },
              },
            ],
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
