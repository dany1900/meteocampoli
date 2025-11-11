import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CumulusSiteComponent} from './cumulus-site.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CumulusSiteComponent,
      },
    ]),
  ],
  exports: [
    RouterModule
  ]
})

export class CumulusSiteRoutingModule {
}
