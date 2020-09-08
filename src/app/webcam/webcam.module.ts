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
import {TabWebcamComponent} from './tab-webcam/tab-webcam.component';
import {WebcamCentroItaliaComponent} from './webcam-centro-italia/webcam-centro-italia.component';
import {WebcamSudItaliaComponent} from './webcam-sud-italia/webcam-sud-italia.component';
import {WebcamNordItaliaComponent} from './webcam-nord-italia/webcam-nord-italia.component';
import {ImmaginiComponent} from './immagini/immagini.component';
import {TabImmagginiWebcamComponent} from './tab-immaggini-webcam/tab-immaggini-webcam.component';
import {WebcamValleCominoComponent} from './webcam-centro-italia/webcam-valle-comino/webcam-valle-comino.component';
import {WebcamRoutingModule} from './webcam-routing.module';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {WebcamPistoiaComponent} from './webcam-centro-italia/webcam-toscana/webcam-pistoia/webcam-pistoia.component';
import {WebcamFirenzeComponent} from './webcam-centro-italia/webcam-toscana/webcam-firenze/webcam-firenze.component';
import {WebcamGrossetoComponent} from './webcam-centro-italia/webcam-toscana/webcam-grosseto/webcam-grosseto.component';
import {WebcamPisaComponent} from './webcam-centro-italia/webcam-toscana/webcam-pisa/webcam-pisa.component';


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
    TabWebcamComponent,
    WebcamValleCominoComponent,
    WebcamNordItaliaComponent,
    WebcamSudItaliaComponent,
    WebcamCentroItaliaComponent,
    ImmaginiComponent,
    TabImmagginiWebcamComponent,
    WebcamPistoiaComponent,
    WebcamFirenzeComponent,
    WebcamGrossetoComponent,
    WebcamPisaComponent
  ],
  exports: []
})
export class WebCamModule {

  constructor() {
  }

}
