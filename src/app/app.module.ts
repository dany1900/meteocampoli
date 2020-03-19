import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MenuComponent} from './menu/menu.component';
import {SliderComponent} from './slider/slider.component';
import {DatiAttualiComponent} from './dati-attuali/dati-attuali.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ShinystatComponent} from './shinystat/shinystat.component';
import {InfoAngularComponent} from './info-angular/info-angular.component';
import {PublicitaComponent} from './publicita/publicita.component';
import {SatTabComponent} from './satellite/sat-tab.component';
import {MatTabsModule} from '@angular/material/tabs';
import {PrevisioniComponent} from './previsioni/previsioni.component';
import {InfoComponent} from './info/info.component';
import {WebcamComponent} from './webcam/webcam.component';
import {TerremotiComponent} from './terremoti/terremoti.component';
import {ImmaginiComponent} from './immagini/immagini.component';
import {StazioniMeteoComponent} from './stazioni-meteo/stazioni-meteo.component';
import {StazioniMoliseComponent} from './stazioni-meteo/stazioni-molise/stazioni-molise.component';
import {StazioniReteMeteoComponent} from './stazioni-meteo/stazioni-rete-meteo/stazioni-rete-meteo.component';
import {WebcamMontagnaComponent} from './webcam/webcam-centro-italia/webcam-montagna/webcam-montagna.component';
import {ValleCominoComponent} from './webcam/webcam-centro-italia/webcam-valle-comino/valle-comino.component';
import {WebcamIserniaComponent} from './webcam/webcam-centro-italia/webcam-molise/webcam-isernia/webcam-isernia.component';
import {WebcamUmbriaComponent} from './webcam/webcam-centro-italia/webcam-umbria/webcam-umbria.component';
import {NordItaliaComponent} from './webcam/webcam-nord-italia/nord-italia.component';
import {SudItaliaComponent} from './webcam/webcam-sud-italia/sud-italia.component';
import {CentroItaliaComponent} from './webcam/webcam-centro-italia/centro-italia.component';
import {WebCamLimitrofeComponent} from './webcam/webcam-centro-italia/webcam-limitrofe/webcamLimitrofe.component';
import {WebcamFrosinoneComponent} from './webcam/webcam-centro-italia/webcam-lazio/webcam-frosinone/webcam-frosinone.component';
import {WebcamLatinaComponent} from './webcam/webcam-centro-italia/webcam-lazio/webcam-latina/webcam-latina.component';
import {WebcamRomaComponent} from './webcam/webcam-centro-italia/webcam-lazio/webcam-roma/webcam-roma.component';
import {WebcamRietiComponent} from './webcam/webcam-centro-italia/webcam-lazio/webcam-rieti/webcam-rieti.component';
import {WebcamViterboComponent} from './webcam/webcam-centro-italia/webcam-lazio/webcam-viterbo/webcam-viterbo.component';
import {WebcamAquilaComponent} from './webcam/webcam-centro-italia/webcam-abruzzo/webcam-aquila/webcam-aquila.component';
import {WebcamPescaraComponent} from './webcam/webcam-centro-italia/webcam-abruzzo/webcam-pescara/webcam-pescara.component';
import {WebcamChietiComponent} from './webcam/webcam-centro-italia/webcam-abruzzo/webcam-chieti/webcam-chieti.component';
import {TerremotiItaliaComponent} from './terremoti/terremoti-italia/terremoti-italia.component';
import {TabSatelliteComponent} from './tab/tab-satellite/tab-satellite.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {TabWebcamComponent} from './tab/tab-webcam/tab-webcam.component';
import {TabStazioniComponent} from './tab/tab-stazioni/tab-stazioni.component';
import {TabImmagginiWebcamComponent} from './tab/tab-immaggini-webcam/tab-immaggini-webcam.component';
import {ArticoliComponent} from './info/articoli/articoli.component';
import {InquinamentoRimediComponent} from './info/articoli/inquinamento-rimedi/inquinamento-rimedi.component';
import {TabInfoComponent} from './tab/tab-info/tab-info.component';
import {CuriositaComponent} from './info/curiosita/curiosita.component';
import {EffemeridiComponent} from './info/effemeridi/effemeridi.component';
import {RiepilogoComponent} from './riepilogo/riepilogo.component';
import {SatelliteGeneraleComponent} from './satellite/generale/satellite-generale.component';
import {WebcamLazioComponent} from './webcam/webcam-centro-italia/webcam-lazio/webcamLazio.component';
import {WebcamAbruzzoComponent} from './webcam/webcam-centro-italia/webcam-abruzzo/webcam-abruzzo.component';
import {WebcamMoliseComponent} from './webcam/webcam-centro-italia/webcam-molise/webcam-molise.component';
import {SatelliteProtezioneCivileComponent} from './satellite/protezione-civile/satellite-protezione-civile.component';
import {SatelliteSudComponent} from './satellite/sud-italia/satellite-sud.component';
import {SatelliteNordComponent} from './satellite/nord-italia/satellite-nord.component';
import {SatelliteCentroComponent} from './satellite/centro-italia/satellite-centro.component';
import {WebcamMarcheComponent} from './webcam/webcam-centro-italia/webcam-marche/webcam-marche.component';
import {WebcamAnconaComponent} from './webcam/webcam-centro-italia/webcam-marche/webcam-ancona/webcam-ancona.component';
import {WebcamMacerataComponent} from './webcam/webcam-centro-italia/webcam-marche/webcam-macerata/webcam-macerata.component';
import {WebcamFermoComponent} from './webcam/webcam-centro-italia/webcam-marche/webcam-fermo/webcam-fermo.component';
import {WebcamPesaroUrbinoComponent} from './webcam/webcam-centro-italia/webcam-marche/webcam-pesaro-urbino/webcam-pesaro-urbino.component';
import {WebcamAscoliComponent} from './webcam/webcam-centro-italia/webcam-marche/webcam-ascoli/webcam-ascoli.component';
import {WebcamTerniComponent} from './webcam/webcam-centro-italia/webcam-umbria/webcam-terni/webcam-terni.component';
import {WebcamPerugiaComponent} from './webcam/webcam-centro-italia/webcam-umbria/webcam-perugia/webcam-perugia.component';
import {StazioniAbruzzoComponent} from './stazioni-meteo/stazioni-abruzzo/stazioni-abruzzo.component';
import {StazioniLazioComponent} from './stazioni-meteo/stazioni-lazio/stazioni-lazio.component';
import {AccordionModule} from 'ngx-accordion';
import {SEOService} from './service/seoservice.service';
import {WebcamToscanaComponent} from './webcam/webcam-centro-italia/webcam-toscana/webcam-toscana.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {WebcamCampobassoComponent} from './webcam/webcam-centro-italia/webcam-molise/webcam-campobasso/webcam-campobasso.component';


@NgModule({

  declarations: [
    AppComponent,
    RiepilogoComponent,
    SatelliteGeneraleComponent,
    MenuComponent,
    SliderComponent,
    DatiAttualiComponent,
    HeaderComponent,
    FooterComponent,
    ShinystatComponent,
    InfoAngularComponent,
    PublicitaComponent,
    SatTabComponent,
    PrevisioniComponent,
    InfoComponent,
    WebcamComponent,
    TerremotiComponent,
    ImmaginiComponent,
    StazioniMeteoComponent,
    WebcamLazioComponent,
    WebcamAbruzzoComponent,
    StazioniReteMeteoComponent,
    WebcamMontagnaComponent,
    ValleCominoComponent,
    WebcamIserniaComponent,
    WebcamMoliseComponent,
    WebcamUmbriaComponent,
    WebcamCampobassoComponent,
    WebcamUmbriaComponent,
    StazioniMoliseComponent,
    WebcamToscanaComponent,
    WebcamMarcheComponent,
    NordItaliaComponent,
    SudItaliaComponent,
    CentroItaliaComponent,
    SatelliteCentroComponent,
    SatelliteNordComponent,
    SatelliteSudComponent,
    SatelliteProtezioneCivileComponent,
    WebcamFrosinoneComponent,
    WebcamLatinaComponent,
    WebcamRomaComponent,
    WebcamRietiComponent,
    WebcamViterboComponent,
    WebCamLimitrofeComponent,
    WebcamAquilaComponent,
    WebcamPescaraComponent,
    WebcamChietiComponent,
    TerremotiItaliaComponent,
    TabSatelliteComponent,
    StazioniLazioComponent,
    StazioniAbruzzoComponent,
    StazioniMeteoComponent,
    TabWebcamComponent,
    TabStazioniComponent,
    TabImmagginiWebcamComponent,
    WebcamPerugiaComponent,
    WebcamTerniComponent,
    WebcamMacerataComponent,
    WebcamAnconaComponent,
    WebcamAscoliComponent,
    WebcamPesaroUrbinoComponent,
    WebcamFermoComponent,
    ArticoliComponent,
    InquinamentoRimediComponent,
    TabInfoComponent,
    CuriositaComponent,
    EffemeridiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    AccordionModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatProgressSpinnerModule
  ],
  providers: [SEOService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
