///<reference path="tab-info/tab-info.component.ts"/>
///<reference path="articoli/giardinaggio/viti/viti.component.ts"/>
///<reference path="articoli/giardinaggio/albicocche/albicocche.component.ts"/>
import {TabInfoComponent} from './tab-info/tab-info.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {InquinamentoRimediComponent} from './articoli/meteo/inquinamento-rimedi/inquinamento-rimedi.component';
import {UliviComponent} from './articoli/giardinaggio/ulivi/ulivi.component';
import {VitiComponent} from './articoli/giardinaggio/viti/viti.component';
import {AlbicoccheComponent} from './articoli/giardinaggio/albicocche/albicocche.component';
import {PescheComponent} from './articoli/giardinaggio/pesche/pesche.component';
import {ArticoliMeteoComponent} from './articoli/meteo/articoli-meteo.component';
import {GiardinaggioComponent} from './articoli/giardinaggio/giardinaggio.component';
import {OndataCaldo2017Component} from './articoli/curiosita/ondata-caldo-2017/ondata-caldo-2017.component';
import {RosaVentiComponent} from './articoli/meteo/rosa-venti/rosa-venti.component';


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
            component: TabInfoComponent,
            data: {
              title: 'Articoli - Meteo Campoli',
            },
            children: [
              {
                path: 'meteo',
                component: ArticoliMeteoComponent,
                data: {
                  title: 'Articoli - meteo - Meteo Campoli',
                  breadcrumb: 'meteo'
                },
              },
              {
                path: 'giardinaggio',
                component: GiardinaggioComponent,
                data: {
                  title: 'Articoli Giardinaggio - meteo - Meteo Campoli',
                  breadcrumb: 'giardinaggio'
                },
              },
            ],
          },
          {
            path: 'curiosita/ondata-caldo-2017',
            component: OndataCaldo2017Component,
            data: {
              title: 'Articoli - Ondata Caldo 2017 - Meteo Campoli',
              breadcrumb: 'ondata-caldo'
            }
          },
          {
            path: 'articoli/meteo/inquinamento-rimedi',
            component: InquinamentoRimediComponent,
            data: {
              title: 'Articoli - Inquinamento Aria - Meteo Campoli',
              breadcrumb: 'inquinamento-rimedi'
            }
          },
          {
            path: 'articoli/meteo/rosa-venti',
            component: RosaVentiComponent,
            data: {
              title: 'Articoli - Rosa dei Venti - Meteo Campoli',
              breadcrumb: 'rosa-venti'
            }
          },
          {
            path: 'articoli/giardinaggio/ulivi',
            component: UliviComponent,
            data: {
              title: 'Articoli - Ulivi - Meteo Campoli',
              breadcrumb: 'ulivi'
            },
          },
          {
            path: 'articoli/giardinaggio/viti',
            component: VitiComponent,
            data: {
              title: 'Articoli - Viti - Meteo Campoli',
              breadcrumb: 'viti'
            },
          },
          {
            path: 'articoli/giardinaggio/pesche',
            component: PescheComponent,
            data: {
              title: 'Articoli - Pesche - Meteo Campoli',
              breadcrumb: 'pesche'
            },
          },
          {
            path: 'articoli/giardinaggio/albicocche',
            component: AlbicoccheComponent,
            data: {
              title: 'Articoli - Albicocche - Meteo Campoli',
              breadcrumb: 'albicocche'
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

export class InfoRoutingModule {
}
