import {SharedModule} from '../shared/shared.module';
import {PrevisioniComponent} from './previsioni.component';
import {NgModule} from '@angular/core';
import {PrevisioniRoutingModule} from './previsioni-routing.module';
import {CommonModule} from '@angular/common';
import {MainPipe} from '../utils/pipe/main-pipe.module';
import {IndiciClimaticiComponent} from './indici-climatici/indici-climatici.component';


@NgModule({
  imports: [
    PrevisioniRoutingModule,
    SharedModule,
    CommonModule,
    MainPipe
  ],

  declarations: [
    PrevisioniComponent,
    IndiciClimaticiComponent
  ],
  exports: []
})
export class PrevisioniModule {

  constructor() {
  }

}
