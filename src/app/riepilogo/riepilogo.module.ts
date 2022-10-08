import {SharedModule} from '../shared/shared.module';
import {RiepilogoComponent} from './riepilogo.component';
import {NgModule} from '@angular/core';
import {RiepilogoRoutingModule} from './riepilogo-routing.module';
import {CommonModule} from '@angular/common';
import {TemperatureMareComponent} from './temperature-mare/temperature-mare.component';
import {AnomalieComponent} from './anomalie/anomalie.component';


@NgModule({
  imports: [
    RiepilogoRoutingModule,
    SharedModule,
    CommonModule
  ],

  declarations: [
    RiepilogoComponent,
    TemperatureMareComponent,
    AnomalieComponent
  ],
  exports: []
})
export class RiepilogoModule {

  constructor() {
  }

}
