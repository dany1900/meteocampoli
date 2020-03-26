import {SharedModule} from '../shared/shared.module';
import {PrevisioniComponent} from './previsioni.component';
import {NgModule} from '@angular/core';
import {PrevisioniRoutingModule} from './previsioni-routing.module';


@NgModule({
  imports: [
    PrevisioniRoutingModule,
    SharedModule
  ],

  declarations: [
    PrevisioniComponent
  ],
  exports: []
})
export class PrevisioniModule {

  constructor() {
  }

}
