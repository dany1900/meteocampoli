import {WebcamComponent} from './webcam.component';
import {WebcamMarcheComponent} from './webcam-centro-italia/webcam-marche/webcam-marche.component';
import {WebcamToscanaComponent} from './webcam-centro-italia/webcam-toscana/webcam-toscana.component';
import {WebcamUmbriaComponent} from './webcam-centro-italia/webcam-umbria/webcam-umbria.component';
import {WebcamMoliseComponent} from './webcam-centro-italia/webcam-molise/webcam-molise.component';
import {WebcamAbruzzoComponent} from './webcam-centro-italia/webcam-abruzzo/webcam-abruzzo.component';
import {WebCamLimitrofeComponent} from './webcam-centro-italia/webcam-limitrofe/webcamLimitrofe.component';
import {WebcamTerniComponent} from './webcam-centro-italia/webcam-umbria/webcam-terni/webcam-terni.component';
import {WebcamPerugiaComponent} from './webcam-centro-italia/webcam-umbria/webcam-perugia/webcam-perugia.component';
import {WebcamAnconaComponent} from './webcam-centro-italia/webcam-marche/webcam-ancona/webcam-ancona.component';
import {WebcamAquilaComponent} from './webcam-centro-italia/webcam-abruzzo/webcam-aquila/webcam-aquila.component';
import {WebcamAscoliComponent} from './webcam-centro-italia/webcam-marche/webcam-ascoli/webcam-ascoli.component';
import {WebcamCampobassoComponent} from './webcam-centro-italia/webcam-molise/webcam-campobasso/webcam-campobasso.component';
import {WebcamChietiComponent} from './webcam-centro-italia/webcam-abruzzo/webcam-chieti/webcam-chieti.component';
import {WebcamFermoComponent} from './webcam-centro-italia/webcam-marche/webcam-fermo/webcam-fermo.component';
import {WebcamFrosinoneComponent} from './webcam-centro-italia/webcam-lazio/webcam-frosinone/webcam-frosinone.component';
import {WebcamIserniaComponent} from './webcam-centro-italia/webcam-molise/webcam-isernia/webcam-isernia.component';
import {WebcamLatinaComponent} from './webcam-centro-italia/webcam-lazio/webcam-latina/webcam-latina.component';
import {WebcamMacerataComponent} from './webcam-centro-italia/webcam-marche/webcam-macerata/webcam-macerata.component';
import {WebcamMontagnaComponent} from './webcam-centro-italia/webcam-montagna/webcam-montagna.component';
import {WebcamPesaroUrbinoComponent} from './webcam-centro-italia/webcam-marche/webcam-pesaro-urbino/webcam-pesaro-urbino.component';
import {WebcamPescaraComponent} from './webcam-centro-italia/webcam-abruzzo/webcam-pescara/webcam-pescara.component';
import {WebcamRietiComponent} from './webcam-centro-italia/webcam-lazio/webcam-rieti/webcam-rieti.component';
import {WebcamRomaComponent} from './webcam-centro-italia/webcam-lazio/webcam-roma/webcam-roma.component';
import {WebcamViterboComponent} from './webcam-centro-italia/webcam-lazio/webcam-viterbo/webcam-viterbo.component';
import {NgModule} from '@angular/core';
import {WebcamLazioComponent} from './webcam-centro-italia/webcam-lazio/webcam-lazio.component';
import {TabCentroWebcamComponent} from './tab-centro-webcam/tab-centro-webcam.component';
import {WebcamCentroItaliaComponent} from './webcam-centro-italia/webcam-centro-italia.component';
import {WebcamSudItaliaComponent} from './webcam-sud-italia/webcam-sud-italia.component';
import {WebcamNordItaliaComponent} from './webcam-nord-italia/webcam-nord-italia.component';
import {ImmaginiComponent} from './immagini/immagini.component';
import {TabWebcamComponent} from './tab-webcam/tab-webcam.component';
import {WebcamValleCominoComponent} from './webcam-centro-italia/webcam-valle-comino/webcam-valle-comino.component';
import {WebcamRoutingModule} from './webcam-routing.module';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {WebcamPistoiaComponent} from './webcam-centro-italia/webcam-toscana/webcam-pistoia/webcam-pistoia.component';
import {WebcamFirenzeComponent} from './webcam-centro-italia/webcam-toscana/webcam-firenze/webcam-firenze.component';
import {WebcamGrossetoComponent} from './webcam-centro-italia/webcam-toscana/webcam-grosseto/webcam-grosseto.component';
import {WebcamSienaComponent} from './webcam-centro-italia/webcam-toscana/webcam-siena/webcam-siena.component';
import {WebcamNordEstComponent} from './webcam-nord-italia/webcam-nord-est/webcam-nord-est.component';
import {WebcamNordOvestComponent} from './webcam-nord-italia/webcam-nord-ovest/webcam-nord-ovest.component';
import {WebcamTeramoComponent} from './webcam-centro-italia/webcam-abruzzo/webcam-teramo/webcam-teramo.component';
import {WebcamSardegnaComponent} from './webcam-isole/webcam-sardegna/webcam-sardegna.component';
import {WebcamSiciliaComponent} from './webcam-isole/webcam-sicilia/webcam-sicilia.component';
import {WebcamIsoleComponent} from './webcam-isole/webcam-isole.component';
import {TabIsoleWebcamComponent} from './tab-isole-webcam/tab-isole-webcam.component';
import {TabNordWebcamComponent} from './tab-nord-webcam/tab-nord-webcam.component';
import {WebcamEmiliaRomagnaComponent} from './webcam-nord-italia/webcam-emilia-romagna/webcam-emilia-romagna.component';
import {TabSudWebcamComponent} from './tab-sud-webcam/tab-sud-webcam.component';
import {WebcamCampaniaComponent} from './webcam-sud-italia/webcam-campania/webcam-campania.component';
import {WebcamPugliaComponent} from './webcam-sud-italia/webcam-puglia/webcam-puglia.component';
import {WebcamBasilicataComponent} from './webcam-sud-italia/webcam-basilicata/webcam-basilicata.component';
import {WebcamCalabriaComponent} from './webcam-sud-italia/webcam-calabria/webcam-calabria.component';
import {WebcamPisaComponent} from './webcam-centro-italia/webcam-toscana/webcam-pisa/webcam-pisa.component';
import {WebcamArezzoComponent} from './webcam-centro-italia/webcam-toscana/webcam-arezzo/webcam-arezzo.component';


@NgModule({
  imports: [
    WebcamRoutingModule,
    SharedModule,
    CommonModule,
  ],

  declarations: [
    WebcamComponent,
    WebcamMarcheComponent,
    WebcamToscanaComponent,
    WebcamUmbriaComponent,
    WebcamMoliseComponent,
    WebcamAbruzzoComponent,
    WebcamLazioComponent,
    WebCamLimitrofeComponent,
    WebcamMontagnaComponent,
    WebcamTerniComponent,
    WebcamPerugiaComponent,
    WebcamAnconaComponent,
    WebcamAquilaComponent,
    WebcamAscoliComponent,
    WebcamCampobassoComponent,
    WebcamChietiComponent,
    WebcamFermoComponent,
    WebcamFrosinoneComponent,
    WebcamIserniaComponent,
    WebcamLatinaComponent,
    WebcamMacerataComponent,
    WebcamPesaroUrbinoComponent,
    WebcamPescaraComponent,
    WebcamRietiComponent,
    WebcamRomaComponent,
    WebcamViterboComponent,
    TabCentroWebcamComponent,
    WebcamValleCominoComponent,
    WebcamNordItaliaComponent,
    WebcamSudItaliaComponent,
    WebcamCentroItaliaComponent,
    ImmaginiComponent,
    TabWebcamComponent,
    TabIsoleWebcamComponent,
    TabNordWebcamComponent,
    WebcamPistoiaComponent,
    WebcamFirenzeComponent,
    WebcamGrossetoComponent,
    WebcamSienaComponent,
    WebcamNordEstComponent,
    WebcamNordOvestComponent,
    WebcamTeramoComponent,
    WebcamSudItaliaComponent,
    WebcamSardegnaComponent,
    WebcamSiciliaComponent,
    WebcamIsoleComponent,
    WebcamEmiliaRomagnaComponent,
    TabSudWebcamComponent,
    WebcamCampaniaComponent,
    WebcamPugliaComponent,
    WebcamBasilicataComponent,
    WebcamCalabriaComponent,
    WebcamSienaComponent,
    WebcamPisaComponent,
    WebcamPistoiaComponent,
    WebcamFirenzeComponent,
    WebcamGrossetoComponent,
    WebcamArezzoComponent
  ],
  exports: []
})
export class WebCamModule {

  constructor() {
  }

}
