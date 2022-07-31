import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RiepilogoComponent} from './riepilogo.component';
import {TemperatureMareComponent} from './temperature-mare/temperature-mare.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RiepilogoComponent,
      },
      {
        path: 'temperature-mare',
        component: TemperatureMareComponent,
      },
    ]),
  ],
  exports: [
    RouterModule
  ]
})

export class RiepilogoRoutingModule {
}
