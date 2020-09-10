import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'terremoti-mondo',
  templateUrl: './terremoti-mondo.component.html',
  styleUrls: ['./terremoti-mondo.component.css']
})
export class TerremotiMondoComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router, public renderer: Renderer2) {
    this.title = 'Terremoti Mondo - Meteo Campoli';
    this.description = 'Informazioni generali sui terremoti. Mappa pericolosità sismica degli ultimi 50 anni nel mondo.';
    this.keywords = 'terremoti meteo campoli, lista terremoti, ultimi terremoti campoli, terremoti campoli appennino, ultimo terremoto campoli, lista terremoti campoli appennino,elenco terremoti in italia, lista ultimi terremoti,lista terremoti ingv aggiornata,elenco sismico italiano,iside terremoti,iside lista terremoti,elenco scosse terremoto,terremoti elenco,ingv lista terremoti iside,meteo terremoti altervista,istituto nazionale geofisica e vulcanologia lista terremoti,lista terremoti italia,elenco terremoti italia,elenco terremoti,lista terremoti qualsiasi magnitudo,bollettino terremoti';
    this.ogUrl = 'www.meteocampoli.altervista.org/terremoti/mondo';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('.title-micro-section');
    el.scrollIntoView();
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

  toggleClass(event: any, classe: string) {
    const hasClass = event.target.classList.contains(classe);
    if (hasClass) {
      this.renderer.removeClass(event.target, classe);
    } else {
      this.renderer.addClass(event.target, classe);
    }
  }


}
