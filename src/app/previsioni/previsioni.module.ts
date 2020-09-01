import {SharedModule} from '../shared/shared.module';
import {PrevisioniComponent} from './previsioni.component';
import {NgModule} from '@angular/core';
import {PrevisioniRoutingModule} from './previsioni-routing.module';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [
    PrevisioniRoutingModule,
    SharedModule,
    CommonModule
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
