import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuComponent} from './menu/menu.component';
import {SliderComponent} from './slider/slider.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ShinystatComponent} from './shinystat/shinystat.component';
import {PublicitaComponent} from './publicita/publicita.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {SEOService} from './service/seoservice.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PageErrorComponent} from './page-error/page-error.component';
import {UtiliyService} from './service/utiliy.service';
import {BreadcrumbModule} from 'angular-crumbs';
import {FbLikeComponent} from './header/fb-like/fb-like.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {CommonModule} from '@angular/common';
import {AdsenseModule} from 'ng2-adsense';
import {GtagModule} from 'angular-gtag';
import {MainPipe} from './utils/pipe/main-pipe.module';
import {MdbCarouselModule} from 'mdb-angular-ui-kit/carousel';

@NgModule({

  declarations: [
    AppComponent,
    MenuComponent,
    SliderComponent,
    HeaderComponent,
    FooterComponent,
    ShinystatComponent,
    PublicitaComponent,
    PageErrorComponent,
    FbLikeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule.withServerTransition({appId: 'meteocampoli'}),
    HttpClientModule,
    FormsModule,
    MainPipe,
    BrowserAnimationsModule,
    NgbModule,
    GtagModule.forRoot({trackingId: 'UA-85484839-1', trackPageviews: true}),
    BreadcrumbModule,
    MdbCarouselModule,
    ReactiveFormsModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-6215193089819382'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  exports: [
    PublicitaComponent
  ],
  providers: [SEOService, UtiliyService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
