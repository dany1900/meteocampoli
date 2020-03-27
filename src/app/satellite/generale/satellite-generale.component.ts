import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'satellite-generale',
  templateUrl: './satellite-generale.component.html',
  styleUrls: ['./satellite-generale.component.css']
})

export class SatelliteGeneraleComponent implements OnInit {

  imageLoader = true;
  imageLoaderMovimento = true;


  constructor(private meta: Meta, private titleService: Title) {
    titleService.setTitle('Satellite Metereologico - Radar Precipitazioni  - Meteo Campoli');
    this.meta.updateTag({
      name: 'description',
      content: 'Monitoraggio completo del meteo. Satelliti infrarossi, meteosat, fulminazioni e sinottica. Radar dettagliato delle precipitazioni in tempo reale.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'satellite meteo campoli, radar meteo campoli, radar precipitazioni meteo campoli, radar fulmini meteo campoli, radar precipitazioni zoom, radar pioggia meteo campoli'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'Satellite Metereologico - Radar Precipitazioni  - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Monitoraggio completo del meteo. Satelliti infrarossi, meteosat, fulminazioni e sinottica. Radar dettagliato delle precipitazioni in tempo reale.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/satellite-generale'});
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Meteo Campoli'
    });
    //this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'});

  }

  ngOnInit() {
  }

  public show1: boolean = false;
  public show2: boolean = false;

  public buttonName: any = 'Mostra';

  toggle() {
    this.show1 = !this.show1;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show1)
      this.buttonName = 'Nascondi';
    else
      this.buttonName = 'Mostra';
  }

  test2() {
    this.show2 = !this.show2;


    if (this.show2)
      this.buttonName = 'Nascondi';
    else
      this.buttonName = 'Mostra';

  }
}
