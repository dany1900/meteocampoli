import {NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    MatTabsModule,
    MatProgressSpinnerModule
  ],

  declarations: [],
  exports: [
    MatTabsModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule {

  constructor() {
  }

}
