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
import {SatelliteComponent} from "./satellite/satellite.component";
import { MenuComponent } from './menu/menu.component';
import { SliderComponent } from './slider/slider.component';
import { DatiAttualiComponent } from './dati-attuali/dati-attuali.component';
import {ApiService} from "../../../testAngular6/src/app/api-service.service";


@NgModule({

  declarations: [

    AppComponent,
    RiepilogoComponent,
    HomeComponent,
    TestComponent,
    SatelliteComponent,
    MenuComponent,
    SliderComponent,
    DatiAttualiComponent


],
  imports: [
    BrowserModule, HttpClientModule, FormsModule ,
    RouterModule.forRoot([
      {
        path: 'riepilogo.html',
        component: RiepilogoComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'datiAttuali',
        component: DatiAttualiComponent
      },
      {
        path: 'test',
        component: TestComponent
      }
      ,
      {
        path: 'satellite',
        component: SatelliteComponent
      }
    ])
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
