import {NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AccordionModule} from 'ngx-accordion';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalComponent} from '../modal/modal.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  imports: [
    MatTabsModule,
    MatProgressSpinnerModule,
    AccordionModule,
    NgbModule,
    MatDialogModule,
    FontAwesomeModule
  ],

  declarations: [
    ModalComponent
  ],
  exports: [
    MatTabsModule,
    MatProgressSpinnerModule,
    AccordionModule,
    NgbModule,
    MatDialogModule
  ]
})
export class SharedModule {

  constructor() {
  }
}
