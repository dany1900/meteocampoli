import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RiepilogoComponent} from './riepilogo.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RiepilogoComponent,
      },
    ]),
  ],
  exports: [
    RouterModule
  ]
})

export class RiepilogoRoutingModule {
}
