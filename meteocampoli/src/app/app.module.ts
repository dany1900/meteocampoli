// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {RiepilogoComponent} from "./riepilogo/riepilogo.component";
import {HomeComponent} from "./home/home.component";
import {TestComponent} from "./test/test.component";
import {SatelliteGeneraleComponent} from "./satellite/generale/satellite-generale.component";
import { MenuComponent } from './menu/menu.component';
import { SliderComponent } from './slider/slider.component';
import { DatiAttualiComponent } from './dati-attuali/dati-attuali.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ShinystatComponent } from './shinystat/shinystat.component';
import { InfoAngularComponent } from './info-angular/info-angular.component';
import { PublicitaComponent } from './publicita/publicita.component';
import { SatTabComponent } from './satellite/sat-tab.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PrevisioniComponent } from './previsioni/previsioni.component';
import { InfoComponent } from './info/info.component';
import { WebcamComponent } from './webcam/webcam.component';
import { TerremotiComponent } from './terremoti/terremoti.component';
import { ImmaginiComponent } from './immagini/immagini.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { LazioComponent } from './temperature/lazio/lazio.component';
import { AbruzzoComponent } from './temperature/abruzzo/abruzzo.component';
import { MoliseComponent } from './temperature/molise/molise.component';
import { MeteonetworkComponent } from './temperature/meteonetwork/meteonetwork.component';
import { ReteNazionaleComponent } from './temperature/rete-nazionale/rete-nazionale.component';
import { WebcamMontagnaComponent } from './webcam/centro-italia/montagna/webcam-montagna.component';
import { ValleCominoComponent } from './webcam/centro-italia/valle-comino/valle-comino.component';
import { WebcamIserniaComponent } from './webcam/centro-italia/molise/isernia/webcam-isernia.component';
import { CampobassoComponent } from './webcam/centro-italia/molise/campobasso/campobasso.component';
import { UmbriaComponent } from './webcam/centro-italia/umbria/umbria.component';
import { ToscanaComponent } from './webcam/centro-italia/toscana/toscana.component';
import { MarcheComponent } from './webcam/centro-italia/marche/marche.component';
import { NordItaliaComponent } from './webcam/nord-italia/nord-italia.component';
import { SudItaliaComponent } from './webcam/sud-italia/sud-italia.component';
import { CentroItaliaComponent } from './webcam/centro-italia/centro-italia.component';
import {WebcamMoliseComponent} from "./webcam/centro-italia/molise/webcam-molise.component";
import {SatelliteCentroComponent} from "./satellite/centro-italia/satellite-centro.component";
import {SatelliteSudComponent} from "./satellite/sud-italia/satellite-sud.component";
import {SatelliteNordComponent} from "./satellite/nord-italia/satellite-nord.component";


@NgModule({

  declarations: [

    AppComponent,
    RiepilogoComponent,
    HomeComponent,
    TestComponent,
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
    TemperatureComponent,
    LazioComponent,
    AbruzzoComponent,
    MeteonetworkComponent,
    ReteNazionaleComponent,
    WebcamMontagnaComponent,
    ValleCominoComponent,
    WebcamIserniaComponent,
    WebcamMoliseComponent,
    CampobassoComponent,
    UmbriaComponent,
    ToscanaComponent,
    MoliseComponent,
    MarcheComponent,
    NordItaliaComponent,
    SudItaliaComponent,
    CentroItaliaComponent,
    SatelliteCentroComponent,
    SatelliteNordComponent,
    SatelliteSudComponent


],
  imports: [
    BrowserModule, HttpClientModule, FormsModule ,MatTabsModule,
    RouterModule.forRoot([
      { path: '',
        redirectTo: 'datiAttuali',
        pathMatch: 'full'
      },
      {
        path: 'datiAttuali',
        component: DatiAttualiComponent
      },
      {
        path: 'riepilogo',
        component: RiepilogoComponent
      },

      {
        path: 'temperature',
        component: TemperatureComponent
      },
      {
        path: 'previsioni',
        component: PrevisioniComponent
      },
      {
        path: 'immagini',
        component: ImmaginiComponent
      },

      {
        path: 'satellite',
        component: SatTabComponent
      },
      {
        path: 'terremoti',
        component: TerremotiComponent
      },
      {
        path: 'info',
        component: InfoComponent
      },
      {
        path: 'webcam-montagna',
        component: WebcamComponent
      },
      {
        path: 'webcam-limitrofe',
        component: WebcamComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'test',
        component: TestComponent
      }
      ,

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
