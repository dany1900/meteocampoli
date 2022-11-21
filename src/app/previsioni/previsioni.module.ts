import {SharedModule} from '../shared/shared.module';
import {PrevisioniComponent} from './previsioni.component';
import {NgModule} from '@angular/core';
import {PrevisioniRoutingModule} from './previsioni-routing.module';
import {CommonModule} from '@angular/common';
import {MainPipe} from '../utils/pipe/main-pipe.module';
import {IndiciClimaticiComponent} from './indici-climatici/indici-climatici.component';
import {TabModelliConfrontoComponent} from './modelli-confronto/tab-modelli-confronto/tab-modelli-confronto.component';
import {TabModelliTipologiaComponent} from './modelli-confronto/tab-modelli-tipologia/tab-modelli-tipologia.component';
import {ModelliConfrontoComponent} from './modelli-confronto/modelli-confronto.component';


@NgModule({
  imports: [
    PrevisioniRoutingModule,
    SharedModule,
    CommonModule,
    MainPipe
  ],

  declarations: [
    PrevisioniComponent,
    IndiciClimaticiComponent,
    ModelliConfrontoComponent,
    TabModelliConfrontoComponent,
    TabModelliTipologiaComponent
  ],
  exports: []
})
export class PrevisioniModule {

  constructor() {
  }

}
