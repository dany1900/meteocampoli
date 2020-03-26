import {NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AccordionModule} from 'ngx-accordion';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    MatTabsModule,
    MatProgressSpinnerModule,
    AccordionModule,
    NgbModule
  ],

  declarations: [],
  exports: [
    MatTabsModule,
    MatProgressSpinnerModule,
    AccordionModule,
    NgbModule
  ]
})
export class SharedModule {

  constructor() {
  }

}
