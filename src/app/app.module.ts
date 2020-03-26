import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MenuComponent} from './menu/menu.component';
import {SliderComponent} from './slider/slider.component';
import {DatiAttualiComponent} from './dati-attuali/dati-attuali.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ShinystatComponent} from './shinystat/shinystat.component';
import {PublicitaComponent} from './publicita/publicita.component';
import {PrevisioniComponent} from './previsioni/previsioni.component';
import {TerremotiComponent} from './terremoti/terremoti.component';
import {TerremotiItaliaComponent} from './terremoti/terremoti-italia/terremoti-italia.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {RiepilogoComponent} from './riepilogo/riepilogo.component';
import {SEOService} from './service/seoservice.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({

  declarations: [
    AppComponent,
    RiepilogoComponent,
    MenuComponent,
    SliderComponent,
    DatiAttualiComponent,
    HeaderComponent,
    FooterComponent,
    ShinystatComponent,
    PublicitaComponent,
    PrevisioniComponent,
    TerremotiComponent,
    TerremotiItaliaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule
  ],
  exports: [

  ],
  providers: [SEOService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
