import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: 'giardinaggio/ulivi',
            data: {
              title: 'Articolo Ulivi - Meteo Campoli',
              breadcrumb: 'ulivi'
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

export class ArticoliRoutingModule {
}
