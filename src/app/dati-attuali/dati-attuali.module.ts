import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import {DatiAttualiRoutingModule} from './dati-attuali-routing.module';
import {DatiAttualiComponent} from './dati-attuali.component';
import {RadioSondaggiComponent} from './radio-sondaggi/radio-sondaggi.component';
import {CommonModule} from '@angular/common';
import {MainPipe} from '../utils/pipe/main-pipe.module';
import {IncendiComponent} from './incendi/incendi.component';
import {StazionePratoComponent} from './stazione-prato/stazione-prato.component';
import {TabDatiComponent} from './tab-dati/tab-dati.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    DatiAttualiRoutingModule,
    SharedModule,
    CommonModule,
    MainPipe,
    MatProgressSpinnerModule
  ],

  declarations: [
    DatiAttualiComponent,
    RadioSondaggiComponent,
    IncendiComponent,
    StazionePratoComponent,
    TabDatiComponent
  ],
  exports: []
})
export class DatiAttualiModule {

  constructor() {
  }

}
