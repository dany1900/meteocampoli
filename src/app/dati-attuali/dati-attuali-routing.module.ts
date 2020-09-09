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
              title: 'About',
              description: 'Description Meta Tag Content',
              ogUrl: 'your og url'
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
