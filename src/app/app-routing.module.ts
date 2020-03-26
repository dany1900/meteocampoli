import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {NgModule} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterModule, Routes} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {DatiAttualiComponent} from './dati-attuali/dati-attuali.component';
import {RiepilogoComponent} from './riepilogo/riepilogo.component';
import {PrevisioniComponent} from './previsioni/previsioni.component';
import {TabImmagginiWebcamComponent} from './tab/tab-immaggini-webcam/tab-immaggini-webcam.component';
import {WebcamLazioComponent} from './webcam/webcam-centro-italia/webcam-lazio/webcamLazio.component';
import {WebcamAbruzzoComponent} from './webcam/webcam-centro-italia/webcam-abruzzo/webcam-abruzzo.component';
import {WebcamMoliseComponent} from './webcam/webcam-centro-italia/webcam-molise/webcam-molise.component';
import {WebcamUmbriaComponent} from './webcam/webcam-centro-italia/webcam-umbria/webcam-umbria.component';
import {WebcamMarcheComponent} from './webcam/webcam-centro-italia/webcam-marche/webcam-marche.component';
import {WebcamToscanaComponent} from './webcam/webcam-centro-italia/webcam-toscana/webcam-toscana.component';
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
  {
    path: 'previsioni',
    component: PrevisioniComponent,
    data: {
      title: 'Previsioni Meteo - Monitoraggio Indici Climatici - Meteo Campoli'
    }
  },
  {
    path: 'webcam/immagini',
    component: TabImmagginiWebcamComponent,
    data: {
      title: 'Immagini e WebCam - Meteo Campoli'
    }
  },
  {
    path: 'webcam/montagna',
    component: TabImmagginiWebcamComponent,
    data: {
      title: 'WebCam Montagna Centro Italia - Meteo Campoli'
    }
  },
  {
    path: 'webcam/limitrofe',
    component: TabImmagginiWebcamComponent,
    data: {
      title: 'Webcam Valle di Comino - Frosinone - Meteo Campoli'
    }
  },
  {
    path: 'webcam/montagna/lazio',
    component: WebcamLazioComponent,
    data: {
      title: 'WebCam Lazio Montagna - Meteo Campoli'
    }
  },
  {
    path: 'webcam/montagna/abruzzo',
    component: WebcamAbruzzoComponent,
    data: {
      title: 'WebCam Abruzzo Montagna - Meteo Campoli'
    }
  },
  {
    path: 'webcam/montagna/molise',
    component: WebcamMoliseComponent,
    data: {
      title: 'WebCam Molise Montagna - Meteo Campoli'
    }
  },
  {
    path: 'webcam/montagna/umbria',
    component: WebcamUmbriaComponent,
    data: {
      title: 'WebCam Umbria Montagna - Meteo Campoli'
    }
  },
  {
    path: 'webcam/montagna/marche',
    component: WebcamMarcheComponent,
    data: {
      title: 'WebCam Marche Montagna - Meteo Campoli'
    }
  },
  {
    path: 'webcam/montagna/toscana',
    component: WebcamToscanaComponent,
    data: {
      title: 'WebCam Toscana Montagna - Meteo Campoli'
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

/*@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'satellite', loadChildren: './satellite/satellite.module#SatelliteModule'},
      {path: 'conti', loadChildren: './conti/conti.module#ContiModule'},
      {path: '**', component: PageNotFoundComponent}
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
*/

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
