import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import {CumulusSiteRoutingModule} from './cumulus-site-routing.module';
import {CommonModule} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MY_DATE_FORMATS, MyDateAdapter} from '../utils/adapter/date-adapter';
import {CumulusSiteComponent} from './cumulus-site.component';


@NgModule({
  imports: [
    CumulusSiteRoutingModule,
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
    CumulusSiteComponent,
  ],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  exports: []
})
export class CumulusSiteModule {

  constructor() {
  }

}
