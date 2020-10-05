import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
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
import {HeaderService} from './service/header.service';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

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
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    BreadcrumbModule,
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  exports: [],
  providers: [SEOService, UtiliyService, HeaderService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
