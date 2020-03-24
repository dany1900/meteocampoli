import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'satellite-sud',
  templateUrl: './satellite-sud.component.html',
  styleUrls: ['./satellite-sud.component.css']
})
export class SatelliteSudComponent implements OnInit {

  imageLoader = true;

  constructor(private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: 'Satelliti infrarossi, meteosat, fulminazioni e sinottica relativi al sud italia. Radar dettagliato delle precipitazioni in tempo reale. Focus sul sud italia.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'satellite sud meteo campoli, radar sud meteo campoli, radar precipitazioni sud italia meteo campoli, radar fulmini sud italia, radar precipitazioni zoom sud italia, radar pioggia sud italia, satellite sud italia'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'Satellite Sud Italia - Radar Precipitazioni  - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Satelliti infrarossi, meteosat, fulminazioni e sinottica relativi al sud italia. Radar dettagliato delle precipitazioni in tempo reale. Focus sul sud italia.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/satellite/sud-italia'});
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Meteo Campoli'
    });
    //this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'});
  }

  ngOnInit() {
  }

}
