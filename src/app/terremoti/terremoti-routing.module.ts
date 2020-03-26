import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TerremotiItaliaComponent} from './terremoti-italia/terremoti-italia.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TerremotiItaliaComponent,
        children: [
          {
            path: 'italia',
            component: TerremotiItaliaComponent,
            data: {
              title: 'Terremoti Elenco Italia - Meteo Campoli'
            }
          },
          {
            path: 'mondo',
            component: TerremotiItaliaComponent,
            data: {
              title: 'Terremoti Elenco Mondo - Meteo Campoli'
            }
          }
        ],
      },
    ]),
  ],
  exports: [
    RouterModule
  ]
})

export class TerremotiRoutingModule {
}
