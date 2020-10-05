import {NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalComponent} from '../modal/modal.component';


@NgModule({
  imports: [
    MatTabsModule,
    MatProgressSpinnerModule,
    NgbModule,
    MatDialogModule
  ],

  declarations: [
    ModalComponent
  ],
  exports: [
    MatTabsModule,
    MatProgressSpinnerModule,
    NgbModule,
    MatDialogModule
  ]
})
export class SharedModule {

  constructor() {
  }
}
