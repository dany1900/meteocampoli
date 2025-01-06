import {SharedModule} from '../shared/shared.module';
import {RiepilogoComponent} from './riepilogo.component';
import {NgModule} from '@angular/core';
import {RiepilogoRoutingModule} from './riepilogo-routing.module';
import {CommonModule} from '@angular/common';
import {TemperatureMareComponent} from './temperature-mare/temperature-mare.component';
import {AnomalieComponent} from './anomalie/anomalie.component';
import {StatisticheStazionePratoComponent} from './statistiche-stazione-prato/statistiche-stazione-prato.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MY_DATE_FORMATS, MyDateAdapter} from '../utils/adapter/date-adapter';
import {TabRiepilogoComponent} from './tab-riepilogo/tab-riepilogo.component';
import {StatisticheStazioneCiceroneComponent} from './statistiche-stazione-cicerone/statistiche-stazione-cicerone.component';
import {StatisticheStazioneSanPancrazioComponent} from './statistiche-stazione-san-pancrazio/statistiche-stazione-san-pancrazio.component';


@NgModule({
  imports: [
    RiepilogoRoutingModule,
    SharedModule,
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatNativeDateModule,
    MatGridListModule,
    ReactiveFormsModule
  ],

  declarations: [
    RiepilogoComponent,
    TemperatureMareComponent,
    AnomalieComponent,
    StatisticheStazionePratoComponent,
    TabRiepilogoComponent,
    StatisticheStazioneCiceroneComponent,
    StatisticheStazioneSanPancrazioComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  exports: []
})
export class RiepilogoModule {

  constructor() {
  }

}
