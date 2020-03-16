// app.module.ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RiepilogoComponent} from "./riepilogo/riepilogo.component";
import {SatelliteGeneraleComponent} from "./satellite/generale/satellite-generale.component";
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
import {StazioniMeteonetworkComponent} from './stazioni-meteo/stazioni-meteonetwork/stazioni-meteonetwork.component';
import {StazioniReteMeteoComponent} from './stazioni-meteo/stazioni-rete-meteo/stazioni-rete-meteo.component';
import {WebcamMontagnaComponent} from './webcam/webcam-centro-italia/webcam-montagna/webcam-montagna.component';
import {ValleCominoComponent} from './webcam/webcam-centro-italia/webcam-valle-comino/valle-comino.component';
import {WebcamIserniaComponent} from './webcam/webcam-centro-italia/webcam-molise/webcam-isernia/webcam-isernia.component';
import {CampobassoComponent} from './webcam/webcam-centro-italia/webcam-molise/webcam-campobasso/campobasso.component';
import {UmbriaComponent} from './webcam/webcam-centro-italia/webcam-umbria/umbria.component';
import {ToscanaComponent} from './webcam/webcam-centro-italia/webcam-toscana/toscana.component';
import {MarcheComponent} from './webcam/webcam-centro-italia/webcam-marche/marche.component';
import {NordItaliaComponent} from './webcam/webcam-nord-italia/nord-italia.component';
import {SudItaliaComponent} from './webcam/webcam-sud-italia/sud-italia.component';
import {CentroItaliaComponent} from './webcam/webcam-centro-italia/centro-italia.component';
import {WebcamMoliseComponent} from "./webcam/webcam-centro-italia/webcam-molise/webcam-molise.component";
import {SatelliteCentroComponent} from "./satellite/centro-italia/satellite-centro.component";
import {SatelliteSudComponent} from "./satellite/sud-italia/satellite-sud.component";
import {SatelliteNordComponent} from "./satellite/nord-italia/satellite-nord.component";
import {WebCamLimitrofeComponent} from './webcam/webcam-centro-italia/webcam-limitrofe/webcamLimitrofe.component';
import {WebcamFrosinoneComponent} from './webcam/webcam-centro-italia/webcam-lazio/webcam-frosinone/webcam-frosinone.component';
import {WebcamLatinaComponent} from './webcam/webcam-centro-italia/webcam-lazio/webcam-latina/webcam-latina.component';
import {WebcamRomaComponent} from './webcam/webcam-centro-italia/webcam-lazio/webcam-roma/webcam-roma.component';
import {WebcamRietiComponent} from './webcam/webcam-centro-italia/webcam-lazio/webcam-rieti/webcam-rieti.component';
import {WebcamViterboComponent} from './webcam/webcam-centro-italia/webcam-lazio/webcam-viterbo/webcam-viterbo.component';
import {AccordionModule} from "ngx-accordion";
import {WebcamAquilaComponent} from './webcam/webcam-centro-italia/webcam-abruzzo/webcam-aquila/webcam-aquila.component';
import {WebcamPescaraComponent} from './webcam/webcam-centro-italia/webcam-abruzzo/webcam-pescara/webcam-pescara.component';
import {WebcamChietiComponent} from './webcam/webcam-centro-italia/webcam-abruzzo/webcam-chieti/webcam-chieti.component';
import {WebcamAbruzzoComponent} from "./webcam/webcam-centro-italia/webcam-abruzzo/webcam-abruzzo.component";
import {WebcamLazioComponent} from "./webcam/webcam-centro-italia/webcam-lazio/webcamLazio.component";
import {TerremotiItaliaComponent} from './terremoti/terremoti-italia/terremoti-italia.component';
import {TabSatelliteComponent} from './tab/tab-satellite/tab-satellite.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SEOService} from "./service/seoservice.service";
import {AppRoutingModule} from './app-routing.module';
import {StazioniLazioComponent} from "./stazioni-meteo/stazioni-lazio/stazioni-lazio.component";
import {StazioniAbruzzoComponent} from "./stazioni-meteo/stazioni-abruzzo/stazioni-abruzzo.component";
import {TabWebcamComponent} from './tab/tab-webcam/tab-webcam.component';
import {TabStazioniComponent} from './tab/tab-stazioni/tab-stazioni.component';
import {TabImmagginiWebcamComponent} from './tab-immaggini-webcam/tab-immaggini-webcam.component';
import {SatelliteProtezioneCivileComponent} from "./satellite/protezione-civile/satellite-protezione-civile.component";

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
    StazioniMeteonetworkComponent,
    StazioniReteMeteoComponent,
    WebcamMontagnaComponent,
    ValleCominoComponent,
    WebcamIserniaComponent,
    WebcamMoliseComponent,
    CampobassoComponent,
    UmbriaComponent,
    ToscanaComponent,
    StazioniMoliseComponent,
    MarcheComponent,
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
    TabImmagginiWebcamComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    AccordionModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [SEOService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
