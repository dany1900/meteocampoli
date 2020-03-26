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
import {PrevisioniComponent} from './previsioni/previsioni.component';
import {InfoComponent} from './info/info.component';
import {TerremotiComponent} from './terremoti/terremoti.component';
import {ImmaginiComponent} from './immagini/immagini.component';
import {StazioniMeteoComponent} from './stazioni-meteo/stazioni-meteo.component';
import {StazioniMoliseComponent} from './stazioni-meteo/stazioni-molise/stazioni-molise.component';
import {StazioniReteMeteoComponent} from './stazioni-meteo/stazioni-rete-meteo/stazioni-rete-meteo.component';
import {ValleCominoComponent} from './webcam/webcam-centro-italia/webcam-valle-comino/valle-comino.component';
import {NordItaliaComponent} from './webcam/webcam-nord-italia/nord-italia.component';
import {SudItaliaComponent} from './webcam/webcam-sud-italia/sud-italia.component';
import {CentroItaliaComponent} from './webcam/webcam-centro-italia/centro-italia.component';
import {TerremotiItaliaComponent} from './terremoti/terremoti-italia/terremoti-italia.component';
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
import {StazioniAbruzzoComponent} from './stazioni-meteo/stazioni-abruzzo/stazioni-abruzzo.component';
import {StazioniLazioComponent} from './stazioni-meteo/stazioni-lazio/stazioni-lazio.component';
import {AccordionModule} from 'ngx-accordion';
import {SEOService} from './service/seoservice.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReteNazionaleComponent} from './satellite/rete-nazionale/rete-nazionale.component';


@NgModule({

  declarations: [
    AppComponent,
    RiepilogoComponent,
    MenuComponent,
    SliderComponent,
    DatiAttualiComponent,
    HeaderComponent,
    FooterComponent,
    ShinystatComponent,
    InfoAngularComponent,
    PublicitaComponent,
    PrevisioniComponent,
    InfoComponent,
    TerremotiComponent,
    ImmaginiComponent,
    StazioniMeteoComponent,
    StazioniReteMeteoComponent,
    ValleCominoComponent,
    StazioniMoliseComponent,
    NordItaliaComponent,
    SudItaliaComponent,
    CentroItaliaComponent,
    TerremotiItaliaComponent,
    StazioniLazioComponent,
    StazioniAbruzzoComponent,
    StazioniMeteoComponent,
    TabWebcamComponent,
    TabStazioniComponent,
    TabImmagginiWebcamComponent,
    ArticoliComponent,
    InquinamentoRimediComponent,
    TabInfoComponent,
    CuriositaComponent,
    EffemeridiComponent,
    ReteNazionaleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AccordionModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule
  ],
  exports: [

  ],
  providers: [SEOService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
