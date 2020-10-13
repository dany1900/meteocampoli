import {Component, ElementRef, OnInit} from '@angular/core';
import {SEOService} from '../service/seoservice.service';
import {ViewportScroller} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'terremoti-info',
  templateUrl: './terremoti.component.html',
  styleUrls: ['./terremoti.component.css']
})
export class TerremotiComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
    this.title = 'Terremoti Informazioni - Meteo Campoli';
    this.description = 'In geofisica i terremoti sono vibrazioni o assestamenti improvvisi. Tale spostamento e\' generato dalle forze di natura tettonica che agiscono costantemente all\'interno della crosta terrestre';
    this.keywords = 'terremoti meteo campoli, lista terremoti, ultimi terremoti campoli, terremoti campoli appennino, ultimo terremoto campoli, lista terremoti campoli appennino,elenco terremoti in italia, lista ultimi terremoti,lista terremoti ingv aggiornata,elenco sismico italiano,iside terremoti,iside lista terremoti,elenco scosse terremoto,terremoti elenco,ingv lista terremoti iside,meteo terremoti altervista,istituto nazionale geofisica e vulcanologia lista terremoti,lista terremoti italia,elenco terremoti italia,elenco terremoti,lista terremoti qualsiasi magnitudo,bollettino terremoti';
    this.ogUrl = 'www.meteocampoli.altervista.org/terremoti/informazioni';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('.testo-articoli');
    if (el.scrollIntoViewIfNeeded) {
      el.scrollIntoViewIfNeeded();
    } else {
      el.scrollIntoView();
    }
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

}
