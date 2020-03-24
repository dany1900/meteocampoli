import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'satellite-nord',
  templateUrl: './satellite-nord.component.html',
  styleUrls: ['./satellite-nord.component.css']
})
export class SatelliteNordComponent implements OnInit {

  imageLoader = true;

  constructor(private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: 'Satellite infrarossi, meteosat, fulminazioni e sinottica relativi al nord italia. Radar dettagliato delle precipitazioni in tempo reale. Focus sul nord italia.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'satellite nord meteo campoli, radar nord meteo campoli, radar precipitazioni nord italia meteo campoli, radar fulmini nord italia, radar precipitazioni zoom nord italia, radar pioggia nord italia, satellite nord italia'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'Satellite Nord Italia - Radar Precipitazioni  - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Satellite infrarossi, meteosat, fulminazioni e sinottica relativi al nord italia. Radar dettagliato delle precipitazioni in tempo reale. Focus sul nord italia.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/satellite/nord-italia'});
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Meteo Campoli'
    });
    //this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'});
  }

  ngOnInit() {
  }

}
