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
import {PublicitaComponent} from './publicita/publicita.component';
import {PrevisioniComponent} from './previsioni/previsioni.component';
import {TerremotiComponent} from './terremoti/terremoti.component';
import {ImmaginiComponent} from './immagini/immagini.component';
import {ValleCominoComponent} from './webcam/webcam-centro-italia/webcam-valle-comino/valle-comino.component';
import {NordItaliaComponent} from './webcam/webcam-nord-italia/nord-italia.component';
import {SudItaliaComponent} from './webcam/webcam-sud-italia/sud-italia.component';
import {CentroItaliaComponent} from './webcam/webcam-centro-italia/centro-italia.component';
import {TerremotiItaliaComponent} from './terremoti/terremoti-italia/terremoti-italia.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {TabWebcamComponent} from './tab/tab-webcam/tab-webcam.component';
import {TabImmagginiWebcamComponent} from './tab/tab-immaggini-webcam/tab-immaggini-webcam.component';
import {RiepilogoComponent} from './riepilogo/riepilogo.component';
import {AccordionModule} from 'ngx-accordion';
import {SEOService} from './service/seoservice.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


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
    PublicitaComponent,
    PrevisioniComponent,
    TerremotiComponent,
    ImmaginiComponent,
    ValleCominoComponent,
    NordItaliaComponent,
    SudItaliaComponent,
    CentroItaliaComponent,
    TerremotiItaliaComponent,
    TabWebcamComponent,
    TabImmagginiWebcamComponent
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
