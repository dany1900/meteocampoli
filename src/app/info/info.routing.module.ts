///<reference path="tab-info/tab-info.component.ts"/>
///<reference path="articoli/giardinaggio/vite/vite.component.ts"/>
///<reference path="articoli/giardinaggio/albicocco/albicocco.component.ts"/>
import {TabInfoComponent} from './tab-info/tab-info.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {InquinamentoRimediComponent} from './articoli/meteo/inquinamento-rimedi/inquinamento-rimedi.component';
import {UlivoComponent} from './articoli/giardinaggio/ulivo/ulivo.component';
import {ViteComponent} from './articoli/giardinaggio/vite/vite.component';
import {AlbicoccoComponent} from './articoli/giardinaggio/albicocco/albicocco.component';
import {PescoComponent} from './articoli/giardinaggio/pesco/pesco.component';
import {ArticoliMeteoComponent} from './articoli/meteo/articoli-meteo.component';
import {GiardinaggioComponent} from './articoli/giardinaggio/giardinaggio.component';
import {OndataCaldo2017Component} from './articoli/curiosita/ondata-caldo-2017/ondata-caldo-2017.component';
import {RosaVentiComponent} from './articoli/meteo/rosa-venti/rosa-venti.component';
import {NoccioloComponent} from './articoli/giardinaggio/nocciolo/nocciolo.component';


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
            path: 'articoli/giardinaggio/ulivo',
            component: UlivoComponent,
            data: {
              title: 'Articoli - Ulivo - Meteo Campoli',
              breadcrumb: 'ulivo'
            },
          },
          {
            path: 'articoli/giardinaggio/vite',
            component: ViteComponent,
            data: {
              title: 'Articoli - Vite - Meteo Campoli',
              breadcrumb: 'vite'
            },
          },
          {
            path: 'articoli/giardinaggio/pesco',
            component: PescoComponent,
            data: {
              title: 'Articoli - Pesco - Meteo Campoli',
              breadcrumb: 'pesco'
            },
          },
          {
            path: 'articoli/giardinaggio/nocciolo',
            component: NoccioloComponent,
            data: {
              title: 'Articoli - Nocciolo - Meteo Campoli',
              breadcrumb: 'nocciolo'
            },
          },
          {
            path: 'articoli/giardinaggio/albicocco',
            component: AlbicoccoComponent,
            data: {
              title: 'Articoli - Albicocco - Meteo Campoli',
              breadcrumb: 'albicocco'
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
