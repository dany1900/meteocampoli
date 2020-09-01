import {SharedModule} from '../shared/shared.module';
import {RiepilogoComponent} from './riepilogo.component';
import {NgModule} from '@angular/core';
import {RiepilogoRoutingModule} from './riepilogo-routing.module';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [
    RiepilogoRoutingModule,
    SharedModule,
    CommonModule
  ],

  declarations: [
    RiepilogoComponent
  ],
  exports: []
})
export class RiepilogoModule {

  constructor() {
  }

}
