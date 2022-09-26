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
import {StazioniUmbriaComponent} from './stazioni-umbria/stazioni-umbria.component';
import {StazioniMarcheComponent} from './stazioni-marche/stazioni-marche.component';


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
    StazioniUmbriaComponent,
    TabStazioniComponent,
    StazioniGeneraliComponent,
    StazioniMarcheComponent
  ],
  exports: []
})
export class StazioniMeteoModule {

  constructor() {
  }

}
