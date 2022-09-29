import {NgModule} from '@angular/core';
import {StazioniMeteoRoutingModule} from './stazioni-meteo-routing.module';
import {SharedModule} from '../shared/shared.module';
import {StazioniAbruzzoComponent} from './centro-italia/stazioni-abruzzo/stazioni-abruzzo.component';
import {StazioniLazioComponent} from './centro-italia/stazioni-lazio/stazioni-lazio.component';
import {StazioniMeteoComponent} from './stazioni-meteo.component';
import {StazioniMoliseComponent} from './centro-italia/stazioni-molise/stazioni-molise.component';
import {StazioniReteMeteoComponent} from './stazioni-rete-meteo/stazioni-rete-meteo.component';
import {TabStazioniComponent} from './tab-stazioni/tab-stazioni.component';
import {StazioniGeneraliComponent} from './centro-italia/stazioni-generali/stazioni-generali.component';
import {CommonModule} from '@angular/common';
import {StazioniUmbriaComponent} from './centro-italia/stazioni-umbria/stazioni-umbria.component';
import {StazioniMarcheComponent} from './centro-italia/stazioni-marche/stazioni-marche.component';
import {TabCentroStazioniComponent} from './tab-centro-stazioni/tab-centro-stazioni.component';
import {TabNordStazioniComponent} from './tab-nord-stazioni/tab-nord-stazioni.component';
import {TabIsoleStazioniComponent} from './tab-isole-webcam/tab-isole-stazioni.component';
import {StazioniNordEstComponent} from './nord-italia/stazioni-nord-est/stazioni-nord-est.component';
import {StazioniNordOvestComponent} from './nord-italia/stazioni-nord-ovest/stazioni-nord-ovest.component';
import {StazioniEmiliaRomagnaComponent} from './nord-italia/stazioni-emilia-romagna/stazioni-emilia-romagna.component';
import {StazioniSardegnaComponent} from './isole/stazioni-sardegna/stazioni-sardegna.component';
import {StazioniSiciliaComponent} from './isole/stazioni-sicilia/stazioni-sicilia.component';
import {StazioniToscanaComponent} from './centro-italia/stazioni-toscana/stazioni-toscana.component';
import {TabSudStazioniComponent} from './tab-sud-stazioni/tab-sud-stazioni.component';
import {StazioniCalabriaComponent} from './sud-italia/stazioni-calabria/stazioni-calabria.component';
import {StazioniBasilicataComponent} from './sud-italia/stazioni-basilicata/stazioni-basilicata.component';
import {StazioniPugliaComponent} from './sud-italia/stazioni-puglia/stazioni-puglia.component';
import {StazioniCampaniaComponent} from './sud-italia/stazioni-campania/stazioni-campania.component';


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
    StazioniMarcheComponent,
    TabCentroStazioniComponent,
    TabNordStazioniComponent,
    TabIsoleStazioniComponent,
    StazioniNordEstComponent,
    StazioniNordOvestComponent,
    StazioniEmiliaRomagnaComponent,
    StazioniSardegnaComponent,
    StazioniSiciliaComponent,
    StazioniToscanaComponent,
    TabSudStazioniComponent,
    StazioniCalabriaComponent,
    StazioniBasilicataComponent,
    StazioniPugliaComponent,
    StazioniCampaniaComponent
  ],
  exports: []
})
export class StazioniMeteoModule {

  constructor() {
  }

}
