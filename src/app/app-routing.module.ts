import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {NgModule} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterModule, Routes} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {DatiAttualiComponent} from './dati-attuali/dati-attuali.component';
import {RiepilogoComponent} from './riepilogo/riepilogo.component';
import {PrevisioniComponent} from './previsioni/previsioni.component';
import {TerremotiComponent} from './terremoti/terremoti.component';
import {TerremotiItaliaComponent} from './terremoti/terremoti-italia/terremoti-italia.component';

export const routes: Routes = [


  {
    path: '',
    redirectTo: 'dati-attuali',
    pathMatch: 'full',
    data: {
      title: 'Meteo Campoli - Monitoraggio Meteo',
    }
  },
  {
    path: 'dati-attuali',
    component: DatiAttualiComponent,
    data: {
      title: 'Meteo Campoli - Monitoraggio Meteo'

    }
  },
  {
    path: 'riepilogo',
    component: RiepilogoComponent,
    data: {
      title: 'Statistiche Meteo Campoli - Riepilogo Dati'
    }
  },
  {path: 'stazioni-meteo', loadChildren: './stazioni-meteo/stazioni-meteo.module#StazioniMeteoModule'},
  {path: 'satellite', loadChildren: './satellite/satellite.module#SatelliteModule'},
  {path: 'info', loadChildren: './info/info.module#InfoModule'},
  {path: 'webcam', loadChildren: './webcam/webcam.module#WebCamModule'},
  {
    path: 'previsioni',
    component: PrevisioniComponent,
    data: {
      title: 'Previsioni Meteo - Monitoraggio Indici Climatici - Meteo Campoli'
    }
  },
  {
    path: 'terremoti',
    component: TerremotiComponent,
    data: {
      title: 'Terremoti Elenco - Meteo Campoli'
    }
  },
  {
    path: 'terremoti/italia',
    component: TerremotiItaliaComponent,
    data: {
      title: 'Terremoti Elenco Italia - Meteo Campoli'
    }
  },
  {
    path: 'terremoti/mondo',
    component: TerremotiItaliaComponent,
    data: {
      title: 'Terremoti Elenco Mondo - Meteo Campoli'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
          return route;
        }
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => {
        //Changing title
        this.titleService.setTitle(event['title']);
        //Changing meta with name="description"
        let tag = {name: 'description', content: event['metaDescription']};
        let attributeSelector: string = 'name="description"';
        this.metaService.removeTag(attributeSelector);
        this.metaService.addTag(tag, false);
      });
  }
}
