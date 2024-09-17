import {NgModule} from '@angular/core';
import {InfoRoutingModule} from './info.routing.module';
import {SharedModule} from '../shared/shared.module';
import {TabInfoComponent} from './tab-info/tab-info.component';
import {CuriositaComponent} from './curiosita/curiosita.component';
import {ArticoliComponent} from './articoli/articoli.component';
import {EffemeridiComponent} from './effemeridi/effemeridi.component';
import {InfoAngularComponent} from '../info-angular/info-angular.component';
import {TabArticoliComponent} from './tab-articoli/tab-articoli.component';
import {GiardinaggioComponent} from './articoli/giardinaggio/giardinaggio.component';
import {InquinamentoRimediComponent} from './articoli/meteo/inquinamento-rimedi/inquinamento-rimedi.component';
import {UlivoComponent} from './articoli/giardinaggio/ulivo/ulivo.component';
import {PescoComponent} from './articoli/giardinaggio/pesco/pesco.component';
import {ViteComponent} from './articoli/giardinaggio/vite/vite.component';
import {AlbicoccoComponent} from './articoli/giardinaggio/albicocco/albicocco.component';
import {ArticoliMeteoComponent} from './articoli/meteo/articoli-meteo.component';
import {OndataCaldo2017Component} from './articoli/curiosita/ondata-caldo-2017/ondata-caldo-2017.component';
import {CommonModule} from '@angular/common';
import {RosaVentiComponent} from './articoli/meteo/rosa-venti/rosa-venti.component';
import {AdsenseModule} from 'ng2-adsense';
import {NoccioloComponent} from './articoli/giardinaggio/nocciolo/nocciolo.component';
import {StratwarmingComponent} from './articoli/meteo/stratwarming/stratwarming.component';
import {AtmosferaComponent} from './articoli/meteo/atmosfera/atmosfera.component';
import {VorticePolareComponent} from './articoli/meteo/vortice-polare/vortice-polare.component';
import {ContattiComponent} from './contatti/contatti.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  imports: [
    InfoRoutingModule,
    SharedModule,
    CommonModule,
    AdsenseModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatNativeDateModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule
  ],

  declarations: [
    CuriositaComponent,
    ArticoliComponent,
    ArticoliMeteoComponent,
    EffemeridiComponent,
    TabInfoComponent,
    InfoAngularComponent,
    TabArticoliComponent,
    GiardinaggioComponent,
    InquinamentoRimediComponent,
    UlivoComponent,
    PescoComponent,
    NoccioloComponent,
    ViteComponent,
    AlbicoccoComponent,
    OndataCaldo2017Component,
    RosaVentiComponent,
    StratwarmingComponent,
    AtmosferaComponent,
    VorticePolareComponent,
    ContattiComponent
  ],
  exports: []
})
export class InfoModule {

  constructor() {
  }

}
