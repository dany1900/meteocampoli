import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TemperatureMareComponent} from './temperature-mare/temperature-mare.component';
import {AnomalieComponent} from './anomalie/anomalie.component';
import {TabRiepilogoComponent} from './tab-riepilogo/tab-riepilogo.component';
import {NeveMontagnaComponent} from './neve-montagna/neve-montagna.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TabRiepilogoComponent,
      },
      {
        path: 'stazione-prato',
        component: TabRiepilogoComponent,
      },
      {
        path: 'stazione-cicerone',
        component: TabRiepilogoComponent,
      },
      {
        path: 'stazione-san-pancrazio',
        component: TabRiepilogoComponent,
      },
      {
        path: 'temperature-mare',
        component: TemperatureMareComponent,
      },
      {
        path: 'anomalie',
        component: AnomalieComponent,
      },
      {
        path: 'neve-montagna',
        component: NeveMontagnaComponent,
      },
    ]),
  ],
  exports: [
    RouterModule
  ]
})

export class RiepilogoRoutingModule {
}
