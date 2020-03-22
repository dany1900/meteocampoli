import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'satellite-centro',
  templateUrl: './satellite-centro.component.html',
  styleUrls: ['./satellite-centro.component.css']
})
export class SatelliteCentroComponent implements OnInit {

  imageLoader = true;
  imageLoaderMovimento = true;

  constructor(private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: 'Satelliti infrarossi, meteosat, fulminazioni e sinottica. Radar dettagliato delle precipitazioni in tempo reale. Focus sul centro italia.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Satellite centro meteo campoli, radar centro meteo campoli, radar precipitazioni centro italia meteo campoli, radar fulmini centro italia, radar precipitazioni zoom centro italia, radar pioggia centro italia, satellite centro italia'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'Satellite Centro Italia - Radar Precipitazioni  - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Satelliti infrarossi, meteosat, fulminazioni e sinottica. Radar dettagliato delle precipitazioni in tempo reale. Focus sul centro italia.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/satellite-centro'});
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Meteo Campoli'
    });
    //this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'});
  }

  ngOnInit() {
  }

}
