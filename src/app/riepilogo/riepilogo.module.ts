import {SharedModule} from '../shared/shared.module';
import {RiepilogoComponent} from './riepilogo.component';
import {NgModule} from '@angular/core';
import {RiepilogoRoutingModule} from './riepilogo-routing.module';
import {CommonModule} from '@angular/common';
import {TemperatureMareComponent} from './temperature-mare/temperature-mare.component';


@NgModule({
  imports: [
    RiepilogoRoutingModule,
    SharedModule,
    CommonModule
  ],

  declarations: [
    RiepilogoComponent,
    TemperatureMareComponent
  ],
  exports: []
})
export class RiepilogoModule {

  constructor() {
  }

}
