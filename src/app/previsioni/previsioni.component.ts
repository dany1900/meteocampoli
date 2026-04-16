import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {SEOService} from '../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../service/utiliy.service';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'previsioni',
  templateUrl: './previsioni.component.html',
  styleUrls: ['./previsioni.component.css']
})
export class PrevisioniComponent implements OnInit, OnDestroy {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  date: string;
  linkGfs: string;
  linkGem: string;
  linkEcmwf: string;
  runGfs: string;
  runGem: string;
  runEcmwf: string;
  runEUkmo: string;

  // animazione mappe
  capeImages: string[] = [];
  currentCapeImage = '';
  currentCapeIndex = 0;
  capeInterval: any = null;
  animationSpeed = 1500;

  dustImages: string[] = [];
  currentDustImage = '';
  currentDustIndex = 0;
  dustInterval: any = null;
  dustAnimationSpeed = 1500;

  lammaMolochGfsImages: string[] = [];
  currentLammaMolochGfsImage = '';
  currentLammaMolochGfsIndex = 0;
  lammaMolochGfsInterval: any = null;
  lammaMolochGfsAnimationSpeed = 1500;

  lammaMolochIfsImages: string[] = [];
  currentLammaMolochIfsImage = '';
  currentLammaMolochIfsIndex = 0;
  lammaMolochIfsInterval: any = null;
  lammaMolochIfsAnimationSpeed = 1200;

  lammaWrfIfsImages: string[] = [];
  currentLammaWrfIfsImage = '';
  currentLammaWrfIfsIndex = 0;
  lammaWrfIfsInterval: any = null;
  lammaWrfIfsAnimationSpeed = 1200;

  lammaMolochIfs850Images: string[] = [];
  currentLammaMolochIfs850Image = '';
  currentLammaMolochIfs850Index = 0;
  lammaMolochIfs850Interval: any = null;
  lammaMolochIfs850AnimationSpeed = 1200;


  constructor(private seo: SEOService, protected router: Router, public renderer: Renderer2, public utilityService: UtiliyService, public deviceService: DeviceDetectorService) {
    this.title = 'Previsioni Meteo - Meteogrammi';
    this.description = 'Previsioni meteo dettagliate locali e nazionali. Analisi radio sondaggi e meteogrammi con tendenza a lungo termine.';
    this.keywords = 'previsioni meteo campoli, previsioni italia, meteogrammi, meteogramma gfs, meteogramma ecmwf, previsiono campoli 3bmeteo, previsioni campoli appennino, Tendenza meteo, previsioni meteo campoli appennino';
    this.ogUrl = 'www.meteocampoli.altervista.org/previsioni';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
    this.linkEcmwf = this.calculateDateEcmwf();
    this.linkGfs = this.calculateDateGfs();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
    this.buildCapeImages();
    this.buildDustImages();
    this.buildLammaMolochGfsImages();
    this.buildLammaMolochIfsImages();
    this.buildLammaWrfIfsImages();
    this.buildLammaMolochIfs850Images();
    this.preloadImages(this.capeImages);
    this.preloadImages(this.dustImages);
    this.preloadImages(this.lammaMolochGfsImages);
    this.preloadImages(this.lammaMolochIfsImages);
    this.preloadImages(this.lammaWrfIfsImages);
    this.preloadImages(this.lammaMolochIfs850Images);
    this.startCapeAnimation();
    this.startDustAnimation();
    this.startLammaMolochGfsAnimation();
    this.startLammaMolochIfsAnimation();
    this.startLammaWrfIfsAnimation();
    this.startLammaMolochIfs850Animation();
  }

  ngOnDestroy(): void {
    this.stopCapeAnimation();
    this.stopDustAnimation();
    this.stopLammaMolochGfsAnimation();
    this.stopLammaMolochIfsAnimation();
    this.stopLammaWrfIfsAnimation();
    this.stopLammaMolochIfs850Animation();
  }


  toggleClass(event: any, classe: string) {
    const hasClass = event.target.classList.contains(classe);
    if (hasClass) {
      this.renderer.removeClass(event.target, classe);
    } else {
      this.renderer.addClass(event.target, classe);
    }
  }

  calculateDateEcmwf(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString();
    const day = String(today.getDate());
    if (Number(month) > 0 && Number(month) < 10) {
      month = '0' + month;
    }
    const hours = today.getHours();
    this.runEcmwf = '00';
    if (hours >= 21) {
      this.runEcmwf = '12';
    }
    this.date = year + month + day + this.runEcmwf;
    //return this.linkEcmwf = 'https://charts.ecmwf.int/products/opencharts_meteogram?base_time=' + this.date-adapter.ts + '00&epsgram=classical_plume&lat=41.7357&lon=13.6837&station_name=Campoli%20Appennino';
    return this.linkEcmwf = 'https://www.wetterzentrale.de/de/ens_image.php?geoid=75620&var=201&run=' + this.runEcmwf + '&date-adapter.ts=' + year + '-' + month + '-' + day + '&model=ecm&member=ENS&bw=1';
  }

  calculateDateGfs(): string {
    const today = new Date();
    const hours = today.getHours();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    if (hours >= 1 && hours < 7) {
      this.runGfs = '18';
    }
    if (hours >= 7 && hours < 12) {
      this.runGfs = '00';
    }
    if (hours >= 12 && hours < 18) {
      this.runGfs = '06';
    }
    if (hours >= 18 || (hours >= 0 && hours < 1)) {
      this.runGfs = '12';
    }
    if ((hours >= 0 && hours < 7) || hours >= 19) {
      this.runGem = '12';
    }
    if (hours >= 7 && hours < 19) {
      this.runGem = '00';
    }
    this.linkGem = 'https://www.wetterzentrale.de/de/ens_image.php?geoid=75620&var=201&run=' + this.runGem + '&date-adapter.ts=' + year + '-' + month + '-' + day + '&model=gem&member=ENS&bw=1';
    return this.linkGfs = 'https://www.wetterzentrale.de/de/ens_image.php?geoid=75620&var=201&run=' + this.runGfs + '&date-adapter.ts=' + year + '-' + month + '-' + day + '&model=gfs&member=ENS&bw=1';
  }

  buildCapeImages(): void {
    this.capeImages = [
      'https://www.wetterzentrale.de/maps/GFSOPIT00_0_11.png',
      'https://www.wetterzentrale.de/maps/GFSOPIT00_3_11.png',
      'https://www.wetterzentrale.de/maps/GFSOPIT00_6_11.png',
      'https://www.wetterzentrale.de/maps/GFSOPIT00_9_11.png',
      'https://www.wetterzentrale.de/maps/GFSOPIT00_12_11.png',
      'https://www.wetterzentrale.de/maps/GFSOPIT00_15_11.png',
      'https://www.wetterzentrale.de/maps/GFSOPIT00_18_11.png',
      'https://www.wetterzentrale.de/maps/GFSOPIT00_21_11.png',
      'https://www.wetterzentrale.de/maps/GFSOPIT00_24_11.png',
      'https://www.wetterzentrale.de/maps/GFSOPIT00_27_11.png',
      'https://www.wetterzentrale.de/maps/GFSOPIT00_30_11.png',
      'https://www.wetterzentrale.de/maps/GFSOPIT00_33_11.png',
      'https://www.wetterzentrale.de/maps/GFSOPIT00_36_11.png',
      'https://www.wetterzentrale.de/maps/GFSOPIT00_39_11.png',
      'https://www.wetterzentrale.de/maps/GFSOPIT00_42_11.png',
      'https://www.wetterzentrale.de/maps/GFSOPIT00_45_11.png',
      'https://www.wetterzentrale.de/maps/GFSOPIT00_48_11.png'
    ];

    this.currentCapeImage = this.capeImages[0];
    this.currentCapeIndex = 0;
  }

  buildDustImages(): void {
    this.dustImages = [
      'https://forecast.uoa.gr/maps/0day/DUST/GRID1/zoomdepos_d/006.zoomdepos_d.png',
      'https://forecast.uoa.gr/maps/0day/DUST/GRID1/zoomdepos_d/012.zoomdepos_d.png',
      'https://forecast.uoa.gr/maps/0day/DUST/GRID1/zoomdepos_d/018.zoomdepos_d.png',
      'https://forecast.uoa.gr/maps/0day/DUST/GRID1/zoomdepos_d/024.zoomdepos_d.png',
      'https://forecast.uoa.gr/maps/0day/DUST/GRID1/zoomdepos_d/030.zoomdepos_d.png',
      'https://forecast.uoa.gr/maps/0day/DUST/GRID1/zoomdepos_d/036.zoomdepos_d.png',
      'https://forecast.uoa.gr/maps/0day/DUST/GRID1/zoomdepos_d/042.zoomdepos_d.png',
      'https://forecast.uoa.gr/maps/0day/DUST/GRID1/zoomdepos_d/048.zoomdepos_d.png'
    ];

    this.currentDustImage = this.dustImages[0];
    this.currentDustIndex = 0;
  }

  buildLammaMolochGfsImages(): void {
    this.lammaMolochGfsImages = [];

    for (let i = 1; i <= 25; i++) {
      this.lammaMolochGfsImages.push(
        `https://www.lamma.toscana.it/models/mol01gfs/last/pcp3h.z2.${i}.png`
      );
    }

    this.currentLammaMolochGfsImage = this.lammaMolochGfsImages[0];
    this.currentLammaMolochGfsIndex = 0;
  }

  buildLammaMolochIfsImages(): void {
    this.lammaMolochIfsImages = [];

    for (let i = 1; i <= 25; i++) {
      this.lammaMolochIfsImages.push(
        `https://www.lamma.toscana.it/models/mol01ecm/last/pcp3h.z2.${i}.png`
      );
    }

    this.currentLammaMolochIfsImage = this.lammaMolochIfsImages[0];
    this.currentLammaMolochIfsIndex = 0;
  }

  buildLammaWrfIfsImages(): void {
    this.lammaWrfIfsImages = [];

    for (let i = 1; i <= 25; i++) {
      this.lammaWrfIfsImages.push(
        `https://www.lamma.toscana.it/models/wrf03ecm/last/pcp3h.z2.${i}.png`
      );
    }

    this.currentLammaWrfIfsImage = this.lammaWrfIfsImages[0];
    this.currentLammaWrfIfsIndex = 0;
  }

  buildLammaMolochIfs850Images(): void {
    this.lammaMolochIfs850Images = [];

    for (let i = 1; i <= 25; i++) {
      this.lammaMolochIfs850Images.push(
        `https://www.lamma.toscana.it/models/mol01ecm/last/zt850.z2.${i}.png`
      );
    }

    this.currentLammaMolochIfs850Image = this.lammaMolochIfs850Images[0];
    this.currentLammaMolochIfs850Index = 0;
  }

  startCapeAnimation(): void {
    if (!this.capeImages.length) {
      return;
    }

    this.stopCapeAnimation();

    this.capeInterval = setInterval(() => {
      this.currentCapeIndex = (this.currentCapeIndex + 1) % this.capeImages.length;
      this.currentCapeImage = this.capeImages[this.currentCapeIndex];
    }, this.animationSpeed);
  }

  startDustAnimation(): void {
    if (!this.dustImages.length) {
      return;
    }

    this.stopDustAnimation();

    this.dustInterval = setInterval(() => {
      this.currentDustIndex =
        (this.currentDustIndex + 1) % this.dustImages.length;

      this.currentDustImage =
        this.dustImages[this.currentDustIndex];
    }, this.dustAnimationSpeed);
  }

  startLammaMolochGfsAnimation(): void {
    if (!this.lammaMolochGfsImages.length) {
      return;
    }

    this.stopLammaMolochGfsAnimation();

    this.lammaMolochGfsInterval = setInterval(() => {
      this.currentLammaMolochGfsIndex =
        (this.currentLammaMolochGfsIndex + 1) % this.lammaMolochGfsImages.length;

      this.currentLammaMolochGfsImage =
        this.lammaMolochGfsImages[this.currentLammaMolochGfsIndex];
    }, this.lammaMolochGfsAnimationSpeed);
  }

  startLammaMolochIfsAnimation(): void {
    if (!this.lammaMolochIfsImages.length) {
      return;
    }

    this.stopLammaMolochIfsAnimation();

    this.lammaMolochIfsInterval = setInterval(() => {
      this.currentLammaMolochIfsIndex =
        (this.currentLammaMolochIfsIndex + 1) % this.lammaMolochIfsImages.length;

      this.currentLammaMolochIfsImage =
        this.lammaMolochIfsImages[this.currentLammaMolochIfsIndex];
    }, this.lammaMolochIfsAnimationSpeed);
  }

  startLammaWrfIfsAnimation(): void {
    if (!this.lammaWrfIfsImages.length) {
      return;
    }

    this.stopLammaWrfIfsAnimation();

    this.lammaWrfIfsInterval = setInterval(() => {
      this.currentLammaWrfIfsIndex =
        (this.currentLammaWrfIfsIndex + 1) % this.lammaWrfIfsImages.length;

      this.currentLammaWrfIfsImage =
        this.lammaWrfIfsImages[this.currentLammaWrfIfsIndex];
    }, this.lammaWrfIfsAnimationSpeed);
  }

  startLammaMolochIfs850Animation(): void {
    if (!this.lammaMolochIfs850Images.length) {
      return;
    }

    this.stopLammaMolochIfs850Animation();

    this.lammaMolochIfs850Interval = setInterval(() => {
      this.currentLammaMolochIfs850Index =
        (this.currentLammaMolochIfs850Index + 1) % this.lammaMolochIfs850Images.length;

      this.currentLammaMolochIfs850Image =
        this.lammaMolochIfs850Images[this.currentLammaMolochIfs850Index];
    }, this.lammaMolochIfs850AnimationSpeed);
  }

  stopCapeAnimation(): void {
    if (this.capeInterval) {
      clearInterval(this.capeInterval);
      this.capeInterval = null;
    }
  }

  stopLammaMolochIfsAnimation(): void {
    if (this.lammaMolochIfsInterval) {
      clearInterval(this.lammaMolochIfsInterval);
      this.lammaMolochIfsInterval = null;
    }
  }

  stopLammaMolochGfsAnimation(): void {
    if (this.lammaMolochGfsInterval) {
      clearInterval(this.lammaMolochGfsInterval);
      this.lammaMolochGfsInterval = null;
    }
  }

  stopDustAnimation(): void {
    if (this.dustInterval) {
      clearInterval(this.dustInterval);
      this.dustInterval = null;
    }
  }

  stopLammaWrfIfsAnimation(): void {
    if (this.lammaWrfIfsInterval) {
      clearInterval(this.lammaWrfIfsInterval);
      this.lammaWrfIfsInterval = null;
    }
  }

  stopLammaMolochIfs850Animation(): void {
    if (this.lammaMolochIfs850Interval) {
      clearInterval(this.lammaMolochIfs850Interval);
      this.lammaMolochIfs850Interval = null;
    }
  }

  nextCapeImage(): void {
    if (!this.capeImages.length) {
      return;
    }

    this.currentCapeIndex = (this.currentCapeIndex + 1) % this.capeImages.length;
    this.currentCapeImage = this.capeImages[this.currentCapeIndex];
  }

  nextDustImage(): void {
    if (!this.dustImages.length) {
      return;
    }

    this.currentDustIndex =
      (this.currentDustIndex + 1) % this.dustImages.length;

    this.currentDustImage =
      this.dustImages[this.currentDustIndex];
  }

  nextLammaMolochGfsImage(): void {
    if (!this.lammaMolochGfsImages.length) {
      return;
    }

    this.currentLammaMolochGfsIndex =
      (this.currentLammaMolochGfsIndex + 1) % this.lammaMolochGfsImages.length;

    this.currentLammaMolochGfsImage =
      this.lammaMolochGfsImages[this.currentLammaMolochGfsIndex];
  }

  nextLammaMolochIfsImage(): void {
    if (!this.lammaMolochIfsImages.length) {
      return;
    }

    this.currentLammaMolochIfsIndex =
      (this.currentLammaMolochIfsIndex + 1) % this.lammaMolochIfsImages.length;

    this.currentLammaMolochIfsImage =
      this.lammaMolochIfsImages[this.currentLammaMolochIfsIndex];
  }

  nextLammaWrfIfsImage(): void {
    if (!this.lammaWrfIfsImages.length) {
      return;
    }

    this.currentLammaWrfIfsIndex =
      (this.currentLammaWrfIfsIndex + 1) % this.lammaWrfIfsImages.length;

    this.currentLammaWrfIfsImage =
      this.lammaWrfIfsImages[this.currentLammaWrfIfsIndex];
  }

  nextLammaMolochIfs850Image(): void {
    if (!this.lammaMolochIfs850Images.length) {
      return;
    }

    this.currentLammaMolochIfs850Index =
      (this.currentLammaMolochIfs850Index + 1) % this.lammaMolochIfs850Images.length;

    this.currentLammaMolochIfs850Image =
      this.lammaMolochIfs850Images[this.currentLammaMolochIfs850Index];
  }

  prevCapeImage(): void {
    if (!this.capeImages.length) {
      return;
    }

    this.currentCapeIndex = (this.currentCapeIndex - 1 + this.capeImages.length) % this.capeImages.length;
    this.currentCapeImage = this.capeImages[this.currentCapeIndex];
  }

  prevDustImage(): void {
    if (!this.dustImages.length) {
      return;
    }

    this.currentDustIndex =
      (this.currentDustIndex - 1 + this.dustImages.length) % this.dustImages.length;

    this.currentDustImage =
      this.dustImages[this.currentDustIndex];
  }

  prevLammaMolochGfsImage(): void {
    if (!this.lammaMolochGfsImages.length) {
      return;
    }

    this.currentLammaMolochGfsIndex =
      (this.currentLammaMolochGfsIndex - 1 + this.lammaMolochGfsImages.length) % this.lammaMolochGfsImages.length;

    this.currentLammaMolochGfsImage =
      this.lammaMolochGfsImages[this.currentLammaMolochGfsIndex];
  }

  prevLammaMolochIfsImage(): void {
    if (!this.lammaMolochIfsImages.length) {
      return;
    }

    this.currentLammaMolochIfsIndex =
      (this.currentLammaMolochIfsIndex - 1 + this.lammaMolochIfsImages.length) % this.lammaMolochIfsImages.length;

    this.currentLammaMolochIfsImage =
      this.lammaMolochIfsImages[this.currentLammaMolochIfsIndex];
  }

  prevLammaWrfIfsImage(): void {
    if (!this.lammaWrfIfsImages.length) {
      return;
    }

    this.currentLammaWrfIfsIndex =
      (this.currentLammaWrfIfsIndex - 1 + this.lammaWrfIfsImages.length) % this.lammaWrfIfsImages.length;

    this.currentLammaWrfIfsImage =
      this.lammaWrfIfsImages[this.currentLammaWrfIfsIndex];
  }

  prevLammaMolochIfs850Image(): void {
    if (!this.lammaMolochIfs850Images.length) {
      return;
    }

    this.currentLammaMolochIfs850Index =
      (this.currentLammaMolochIfs850Index - 1 + this.lammaMolochIfs850Images.length) % this.lammaMolochIfs850Images.length;

    this.currentLammaMolochIfs850Image =
      this.lammaMolochIfs850Images[this.currentLammaMolochIfs850Index];
  }

  onImageLoad(): void {
    this.imageLoader = false;
  }

  onImageCapeError(): void {
    this.imageLoader = false;
    this.stopCapeAnimation();
  }

  onImageDustError(): void {
    this.imageLoader = false;
    this.stopDustAnimation();
  }

  onImageLammaMolochGfsError(): void {
    this.imageLoader = false;
    this.stopLammaMolochGfsAnimation();
  }

  onImageLammaMolochIfsError(): void {
    this.imageLoader = false;
    this.stopLammaMolochIfsAnimation();
  }

  onImageLammaWrfIfsError(): void {
    this.stopLammaWrfIfsAnimation();
  }

  onImageLammaMolochIfs850Error(): void {
    this.stopLammaMolochIfs850Animation();
  }

  preloadImages(images: string[]): void {
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

}
