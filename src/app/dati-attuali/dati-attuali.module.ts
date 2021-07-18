import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import {DatiAttualiRoutingModule} from './dati-attuali-routing.module';
import {DatiAttualiComponent} from './dati-attuali.component';
import {RadioSondaggiComponent} from './radio-sondaggi/radio-sondaggi.component';
import {CommonModule} from '@angular/common';
import {MainPipe} from '../utils/pipe/main-pipe.module';
import {QRCodeModule} from 'angularx-qrcode';


@NgModule({
  imports: [
    DatiAttualiRoutingModule,
    SharedModule,
    CommonModule,
    MainPipe,
    QRCodeModule
  ],

  declarations: [
    DatiAttualiComponent,
    RadioSondaggiComponent
  ],
  exports: []
})
export class DatiAttualiModule {

  constructor() {
  }

}
