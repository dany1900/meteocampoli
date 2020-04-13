import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TabInfoComponent} from './tab-info/tab-info.component';
import {InquinamentoRimediComponent} from './articoli/meteo/inquinamento-rimedi/inquinamento-rimedi.component';
import {UliviComponent} from './articoli/giardinaggio/ulivi/ulivi.component';
import {VitiComponent} from './articoli/giardinaggio/viti/viti.component';
import {PescheComponent} from './articoli/giardinaggio/pesche/pesche.component';
import {AlbicoccheComponent} from './articoli/giardinaggio/albicocche/albicocche.component';


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
                  title: 'Articoli - Inquinamento Aria - Meteo Campoli',
                  breadcrumb: 'inquinamento-rimedi'
                }
              },
              {
                path: 'giardinaggio/ulivi',
                component: UliviComponent,
                data: {
                  title: 'Articoli - Ulivi - Meteo Campoli',
                  breadcrumb: 'ulivi'
                },
              },
              {
                path: 'giardinaggio/viti',
                component: VitiComponent,
                data: {
                  title: 'Articoli - Viti - Meteo Campoli',
                  breadcrumb: 'viti'
                },
              },
              {
                path: 'giardinaggio/pesche',
                component: PescheComponent,
                data: {
                  title: 'Articoli - Pesche - Meteo Campoli',
                  breadcrumb: 'pesche'
                },
              },
              {
                path: 'giardinaggio/albicocche',
                component: AlbicoccheComponent,
                data: {
                  title: 'Articoli - Albicocche - Meteo Campoli',
                  breadcrumb: 'albicocche'
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
