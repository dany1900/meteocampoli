import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import {DatiAttualiRoutingModule} from './dati-attuali-routing.module';
import {DatiAttualiComponent} from './dati-attuali.component';


@NgModule({
  imports: [
    DatiAttualiRoutingModule,
    SharedModule
  ],

  declarations: [
    DatiAttualiComponent
  ],
  exports: []
})
export class DatiAttualiModule {

  constructor() {
  }

}
