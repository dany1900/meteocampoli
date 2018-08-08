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
import { TabComponent } from './satellite/tab/tab.component';
import {MatTabsModule} from '@angular/material/tabs';


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
    TabComponent


],
  imports: [
    BrowserModule, HttpClientModule, FormsModule ,MatTabsModule,
    RouterModule.forRoot([
      { path: '',
        redirectTo: 'datiAttuali',
        pathMatch: 'full'
      },

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
        component: SatelliteGeneraleComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
