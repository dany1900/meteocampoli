import {NgModule} from '@angular/core';
import {StazioniMeteoRoutingModule} from './stazioni-meteo-routing.module';
import {SharedModule} from '../shared/shared.module';
import {StazioniAbruzzoComponent} from './stazioni-abruzzo/stazioni-abruzzo.component';
import {StazioniLazioComponent} from './stazioni-lazio/stazioni-lazio.component';
import {StazioniMeteoComponent} from './stazioni-meteo.component';
import {StazioniMoliseComponent} from './stazioni-molise/stazioni-molise.component';
import {StazioniReteMeteoComponent} from './stazioni-rete-meteo/stazioni-rete-meteo.component';
import {TabStazioniComponent} from './tab-stazioni/tab-stazioni.component';
import {StazioniGeneraliComponent} from './stazioni-generali/stazioni-generali.component';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [
    StazioniMeteoRoutingModule,
    SharedModule,
    CommonModule
  ],

  declarations: [
    StazioniLazioComponent,
    StazioniAbruzzoComponent,
    StazioniMeteoComponent,
    StazioniReteMeteoComponent,
    StazioniMoliseComponent,
    TabStazioniComponent,
    StazioniGeneraliComponent
  ],
  exports: []
})
export class StazioniMeteoModule {

  constructor() {
  }

}
