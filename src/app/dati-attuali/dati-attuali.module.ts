import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import {DatiAttualiRoutingModule} from './dati-attuali-routing.module';
import {DatiAttualiComponent} from './dati-attuali.component';
import {RadioSondaggiComponent} from './radio-sondaggi/radio-sondaggi.component';
import {CommonModule} from '@angular/common';
import {MainPipe} from '../utils/pipe/main-pipe.module';
import {IncendiComponent} from './incendi/incendi.component';


@NgModule({
  imports: [
    DatiAttualiRoutingModule,
    SharedModule,
    CommonModule,
    MainPipe
  ],

  declarations: [
    DatiAttualiComponent,
    RadioSondaggiComponent,
    IncendiComponent
  ],
  exports: []
})
export class DatiAttualiModule {

  constructor() {
  }

}
