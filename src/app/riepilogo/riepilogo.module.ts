import {SharedModule} from '../shared/shared.module';
import {RiepilogoComponent} from './riepilogo.component';
import {NgModule} from '@angular/core';
import {RiepilogoRoutingModule} from './riepilogo-routing.module';


@NgModule({
  imports: [
    RiepilogoRoutingModule,
    SharedModule
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
