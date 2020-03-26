import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PrevisioniComponent} from './previsioni.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PrevisioniComponent
      },
    ]),
  ],
  exports: [
    RouterModule
  ]
})

export class PrevisioniRoutingModule {
}
