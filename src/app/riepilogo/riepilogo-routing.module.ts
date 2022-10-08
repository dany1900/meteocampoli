import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RiepilogoComponent} from './riepilogo.component';
import {TemperatureMareComponent} from './temperature-mare/temperature-mare.component';
import {AnomalieComponent} from './anomalie/anomalie.component';


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
      {
        path: 'anomalie',
        component: AnomalieComponent,
      },
    ]),
  ],
  exports: [
    RouterModule
  ]
})

export class RiepilogoRoutingModule {
}
