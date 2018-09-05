import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';



import { Title, Meta } from '@angular/platform-browser';
import {RiepilogoComponent} from "./riepilogo/riepilogo.component";
import {StazioniMeteoComponent} from "./stazioni-meteo/stazioni-meteo.component";
import {InfoComponent} from "./info/info.component";
import {WebCamLimitrofeComponent} from "./webcam/webcam-centro-italia/webcam-limitrofe/webcamLimitrofe.component";
import {TestComponent} from "./test/test.component";
import {HomeComponent} from "./home/home.component";
import {ImmaginiComponent} from "./immagini/immagini.component";
import {SatTabComponent} from "./satellite/sat-tab.component";
import {PrevisioniComponent} from "./previsioni/previsioni.component";
import {WebcamComponent} from "./webcam/webcam.component";
import {TerremotiComponent} from "./terremoti/terremoti.component";
import {TerremotiItaliaComponent} from "./terremoti/terremoti-italia/terremoti-italia.component";
import {DatiAttualiComponent} from "./dati-attuali/dati-attuali.component";
import {SatelliteNordComponent} from "./satellite/nord-italia/satellite-nord.component";
import {SatelliteSudComponent} from "./satellite/sud-italia/satellite-sud.component";
import {SatelliteCentroComponent} from "./satellite/centro-italia/satellite-centro.component";
import {StazioniLazioComponent} from "./stazioni-meteo/stazioni-lazio/stazioni-lazio.component";
import {StazioniAbruzzoComponent} from "./stazioni-meteo/stazioni-abruzzo/stazioni-abruzzo.component";
import {StazioniMoliseComponent} from "./stazioni-meteo/stazioni-molise/stazioni-molise.component";
import {StazioniReteMeteoComponent} from "./stazioni-meteo/stazioni-rete-meteo/stazioni-rete-meteo.component";
import {StazioniMeteonetworkComponent} from "./stazioni-meteo/stazioni-meteonetwork/stazioni-meteonetwork.component";
import {TabStazioniComponent} from "./tab/tab-stazioni/tab-stazioni.component";

export  const routes: Routes = [


  {
  path: '',
  redirectTo: 'datiAttuali',
  pathMatch: 'full',
    data: {
      title: 'Meteo Campoli - Monitoraggio Meteo'

}

  },
{
  path: 'datiAttuali',
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

{
  path: 'stazioni-meteo',
    component: TabStazioniComponent,
  data: {
    title: 'Temperature - Stazioni Meteo Centro Italia - Dati'

  }
},
  {
    path: 'stazioni-meteo/:tipo',
    component: TabStazioniComponent,
    data: {
      title: 'Stazioni Meteo Lazio - Dati - Meteo Campoli'
    }
  },
  {
    path: 'stazioni-meteo/:tipo',
    component: TabStazioniComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'stazioni-meteo-molise',
    component: TabStazioniComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'stazioni-meteo-rete-nazionale',
    component: TabStazioniComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'stazioni-meteo-meteonetwork',
    component: TabStazioniComponent,
    data: {
      title: ''
    }
  },
{
  path: 'previsioni',
    component: PrevisioniComponent,
  data: {
    title: 'Previsioni Meteo - Monitoraggio Indici Climatici - Meteo Campoli'
  }
},
{
  path: 'immagini',
    component: ImmaginiComponent,
  data: {
    title: ''
  }
},

{
  path: 'satellite-generale',
    component: SatTabComponent
},
  {
    path: 'satellite-nord-italia',
    component: SatelliteNordComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'satellite-sud-italia',
    component: SatelliteSudComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'satellite-centro-italia',
    component: SatelliteCentroComponent,
    data: {
      title: ''
    }
  },
{
  path: 'terremoti',
    component: TerremotiComponent,
  data: {
    title: ''
  }
},
{
  path: 'terremoti-italia',
    component: TerremotiItaliaComponent,
  data: {
    title: ''
  }
},
  {
    path: 'terremoti-mondo',
    component: TerremotiItaliaComponent,
    data: {
      title: ''
    }
  },
{
  path: 'info',
    component: InfoComponent,
  data: {
    title: ''
  }
},
{
  path: 'webcam-montagna',
    component: WebcamComponent,
  data: {
    title: ''
  }
},
{
  path: 'webcam-limitrofe',
    component: WebCamLimitrofeComponent,
  data: {
    title: ''
  }
},
{
  path: 'home',
    component: HomeComponent,
  data: {
    title: ''
  }
},
{
  path: 'test',
    component: TestComponent
}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})



export class AppRoutingModule {



  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ){
    //Boilerplate code to filter out only important router events and to pull out data object field from each route
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      //Data fields are merged so we can use them directly to take title and metaDescription for each route from them
      .mergeMap(route => route.data)
      //Real action starts there
      .subscribe((event) => {
        //Changing title
        this.titleService.setTitle(event['title']);

        //Changing meta with name="description"
        var tag = { name: 'description', content: event['metaDescription'] };
        let attributeSelector : string = 'name="description"';
        this.metaService.removeTag(attributeSelector);
        this.metaService.addTag(tag, false);
      });
  }

}
