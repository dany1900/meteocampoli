import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  MatDialog,
  MatDialogConfig
} from '@angular/material/dialog';

import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl
} from '@angular/platform-browser';

import { DeviceDetectorService } from 'ngx-device-detector';
import { ModalComponent } from '../modal/modal.component';

import Hls from 'hls.js';

@Component({
  selector: 'webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent
  implements OnInit, OnChanges, OnDestroy {

  @Input() luogo: string;
  @Input() altitudine: string;
  @Input() urlSite: string;
  @Input() urlWebcam: string;
  @Input() timeout = false;

  @Input() tipo:
    'immagine' | 'youtube' | 'iframe' | 'hls' | 'windy'
    = 'immagine';

  @Input() windyId = '';

  imageLoader = true;

  // YOUTUBE / CAMSTREAMER
  safeVideoUrl: SafeResourceUrl | null = null;

  // WINDY
  safeWindyHtml: SafeHtml | null = null;
  windyError = '';

  // HLS / CAMSTREAMER
  videoAvviato = false;
  videoError = '';

  // ==========================================
  // HLS
  // ==========================================

  private hls: Hls | null = null;
  private hlsUrl = '';
  private videoElement: HTMLVideoElement | null = null;

  private tentativiRete = 0;
  private tentativiMedia = 0;

  private readonly MAX_TENTATIVI_RETE = 2;
  private readonly MAX_TENTATIVI_MEDIA = 2;

  private distrutto = false;

  // ==========================================
  // RIFERIMENTO AL VIDEO HLS
  // ==========================================

  @ViewChild('hlsVideo')
  set hlsVideoRef(
    ref: ElementRef<HTMLVideoElement> | undefined
  ) {
    if (
      !ref ||
      this.tipo !== 'hls' ||
      !this.videoAvviato ||
      this.distrutto
    ) {
      return;
    }

    const video = ref.nativeElement;

    if (this.videoElement !== video) {
      this.inizializzaHls(video);
    }
  }

  constructor(
    private matDialog: MatDialog,
    private deviceService: DeviceDetectorService,
    private sanitizer: DomSanitizer
  ) {}

  // ==========================================
  // INIZIALIZZAZIONE
  // ==========================================

  ngOnInit(): void {
    this.preparaComponente();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['tipo'] ||
      changes['urlWebcam'] ||
      changes['windyId']
    ) {
      this.preparaComponente();
    }
  }

  private preparaComponente(): void {
    if (this.distrutto) {
      return;
    }

    if (
      this.tipo === 'youtube' ||
      this.tipo === 'iframe'
    ) {
      this.prepareVideoUrl();
      this.imageLoader = false;
    }

    if (this.tipo === 'hls') {
      this.prepareHlsUrl();
      this.imageLoader = false;
    }

    if (this.tipo === 'windy') {
      this.prepareWindy();
      this.imageLoader = false;
    }
  }

  // ==========================================
  // YOUTUBE / CAMSTREAMER
  // ==========================================

  prepareVideoUrl(): void {
    this.safeVideoUrl = null;

    if (!this.urlWebcam) {
      return;
    }

    try {
      const url = new URL(this.urlWebcam);
      let embedUrl = '';

      if (url.protocol !== 'https:') {
        return;
      }

      if (this.tipo === 'youtube') {
        let videoId = '';

        const youtubeHosts = [
          'youtube.com',
          'www.youtube.com',
          'm.youtube.com',
          'youtube-nocookie.com',
          'www.youtube-nocookie.com'
        ];

        if (youtubeHosts.includes(url.hostname)) {

          if (url.pathname.startsWith('/embed/')) {
            videoId = url.pathname.split('/')[2];

          } else if (url.pathname === '/watch') {
            videoId = url.searchParams.get('v') || '';

          } else if (url.pathname.startsWith('/live/')) {
            videoId = url.pathname.split('/')[2];
          }

        } else if (
          url.hostname === 'youtu.be' ||
          url.hostname === 'www.youtu.be'
        ) {
          videoId = url.pathname.split('/')[1];
        }

        if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
          console.error(
            'ID YouTube non valido:',
            this.urlWebcam
          );
          return;
        }

        embedUrl =
          'https://www.youtube-nocookie.com/embed/' +
          videoId +
          '?playsinline=1&rel=0';

      } else if (this.tipo === 'iframe') {

        // Player iframe autorizzati: CamStreamer e Meteo2 Roccaraso.
        const camStreamerConsentito =
          url.hostname.toLowerCase() === 'camstreamer.com' &&
          url.pathname.startsWith('/embed/');

        const meteo2Consentito =
          url.hostname.toLowerCase() === 'player.meteo2.it' &&
          url.pathname === '/player-unico/player.html' &&
          url.search === '?cam=roccaraso';

        if (!camStreamerConsentito && !meteo2Consentito) {
          console.error(
            'Player iframe non consentito:',
            this.urlWebcam
          );
          return;
        }

        embedUrl = url.href;
      }

      if (embedUrl) {
        this.safeVideoUrl =
          this.sanitizer.bypassSecurityTrustResourceUrl(
            embedUrl
          );
      }

    } catch (error) {
      console.error(
        'URL streaming non valido:',
        error
      );
    }
  }

  // ==========================================
  // WINDY - VALIDAZIONE
  // ==========================================

  private isWindyIdValido(): boolean {
    return /^[0-9]+$/.test(this.windyId || '');
  }

  // ==========================================
  // WINDY - DOCUMENTO HTML ISOLATO
  // ==========================================

  private prepareWindy(): void {
    this.safeWindyHtml = null;
    this.windyError = '';

    if (!this.isWindyIdValido()) {
      this.windyError = 'ID webcam Windy non valido.';
      return;
    }

    // L'ID viene validato prima dell'inserimento
    // nel documento HTML.
    //
    // Non inseriamo HTML o JavaScript proveniente
    // da altri input dell'utente.

    const id = this.windyId;

    const html = `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
<meta
  name="viewport"
content="width=device-width, initial-scale=1.0"
  >

  <style>
  * {
    box-sizing: border-box;
}

html,
  body {
  width: 100%;
  min-height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background: #182c40;
  overflow-x: hidden;
}

.windy-wrapper {
  width: 100%;
  margin: 0 auto;
}

.windy-wrapper > a {
  display: block;
  padding: 20px;
  color: #fff;
  text-align: center;
}
</style>
</head>

<body>

<div class="windy-wrapper">

<a
  name="windy-webcam-timelapse-player"
data-id="${id}"
data-play="day"
data-loop="0"
data-auto-play="0"
data-force-full-screen-on-overlay-play="0"
data-interactive="1"
href="https://windy.com/webcams/${id}"
target="_blank"
rel="noopener noreferrer"
  >
  Apri webcam Windy
</a>

</div>

<script
async
type="text/javascript"
src="https://webcams.windy.com/webcams/public/embed/v2/script/player.js">
  </script>

  </body>
  </html>
    `;

    // Documento costruito esclusivamente con markup
    // statico e con un ID numerico validato.
    //
    // Il trusted HTML viene utilizzato soltanto
    // per questo embed ufficiale e controllato.

    this.safeWindyHtml =
      this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // ==========================================
  // HLS - PREPARAZIONE URL
  // ==========================================


  prepareHlsUrl(): void {
    this.hlsUrl = '';
    this.videoError = '';

    if (!this.urlWebcam) {
      this.videoError =
        'Indirizzo streaming non disponibile.';
      return;
    }

    try {
      const url = new URL(this.urlWebcam);

      if (
        url.protocol !== 'https:' ||
        !url.pathname.toLowerCase().endsWith('.m3u8')
      ) {
        this.videoError = 'Indirizzo HLS non valido.';
        return;
      }

      // CamStreamer
      const sorgenteCamStreamer =
        url.hostname.toLowerCase() === '5e0add8153fcd.streamlock.net' &&
        url.pathname.startsWith('/vedetta/');

      // TurismoMeteo - Zurrone
      const sorgenteTurismoMeteo =
        url.hostname.toLowerCase() === 'streaming-05.dyndns.org' &&
        url.pathname === '/hls/zurrone.m3u8';

      // Meteo2 - Roccaraso
      const sorgenteMeteo2 =
        url.hostname.toLowerCase() === 'player.meteo2.it' &&
        url.pathname === '/hls-clean/webcam6-clean.m3u8';

      if (
        !sorgenteCamStreamer &&
        !sorgenteTurismoMeteo &&
        !sorgenteMeteo2
      ) {
        this.videoError = 'Sorgente HLS non consentita.';
        return;
      }

      this.hlsUrl = url.href;

    } catch (error) {
      this.videoError = 'Indirizzo streaming non valido.';
      console.error('Errore URL HLS:', error);
    }
  }


  // ==========================================
  // AVVIO CAMSTREAMER / HLS
  // ==========================================

  avviaVideo(): void {
    if (
      this.tipo === 'iframe' &&
      this.safeVideoUrl
    ) {
      this.videoAvviato = true;
      return;
    }

    if (
      this.tipo === 'hls' &&
      this.hlsUrl
    ) {
      this.videoError = '';
      this.resetTentativi();
      this.videoAvviato = true;
    }
  }

  // ==========================================
  // HLS - RESET TENTATIVI
  // ==========================================

  private resetTentativi(): void {
    this.tentativiRete = 0;
    this.tentativiMedia = 0;
  }

  // ==========================================
  // HLS - INIZIALIZZAZIONE
  // ==========================================

  private inizializzaHls(
    video: HTMLVideoElement
  ): void {
    if (!this.hlsUrl || this.distrutto) {
      return;
    }

    // Pulisce il vecchio player
    this.distruggiHls();

    this.videoElement = video;

    video.controls = true;
    video.playsInline = true;
    video.preload = 'none';

    // Prima Hls.js: alcuni browser dichiarano il supporto
    // HLS nativo ma non riescono a decodificare certi stream.
    if (Hls.isSupported()) {
      const player = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 30
      });

      this.hls = player;

      player.on(
        Hls.Events.MEDIA_ATTACHED,
        () => {
          if (this.hls === player) {
            player.loadSource(this.hlsUrl);
          }
        }
      );

      player.on(
        Hls.Events.MANIFEST_PARSED,
        () => {
          if (this.hls === player) {
            this.videoError = '';
            this.tentaRiproduzione(video);
          }
        }
      );

      player.on(
        Hls.Events.ERROR,
        (_event, data) => {
          if (this.hls !== player || this.distrutto) {
            return;
          }

          // Manteniamo i dettagli per capire eventuali
          // errori CORS, HTTP o incompatibilità codec.
          console.warn(
            'Errore HLS:',
            data.type,
            data.details,
            data
          );

          if (!data.fatal) {
            return;
          }

          // Recupero problemi di rete
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            if (this.tentativiRete < this.MAX_TENTATIVI_RETE) {
              this.tentativiRete++;
              player.startLoad();
              return;
            }
          }

          // Recupero errori multimediali
          if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
            if (this.tentativiMedia < this.MAX_TENTATIVI_MEDIA) {
              this.tentativiMedia++;
              player.recoverMediaError();
              return;
            }
          }

          this.videoError =
            'Streaming momentaneamente non disponibile.';

          this.distruggiHls();
        }
      );

      player.attachMedia(video);
      return;
    }

    // HLS nativo come alternativa, ad esempio Safari.
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = this.hlsUrl;
      video.load();
      this.tentaRiproduzione(video);
      return;
    }

    this.videoError = 'Il browser non supporta HLS.';
  }

  private tentaRiproduzione(
    video: HTMLVideoElement
  ): void {
    video.play().catch(() => {
      // Alcuni browser richiedono
      // un secondo clic sul Play nativo.
    });
  }

  // ==========================================
  // HLS - RIPROVA
  // ==========================================

  riprovaVideo(): void {
    if (
      this.tipo !== 'hls' ||
      !this.hlsUrl
    ) {
      return;
    }

    this.distruggiHls();
    this.resetTentativi();

    this.videoError = '';
    this.videoAvviato = false;
  }

  // ==========================================
  // HLS - PULIZIA
  // ==========================================

  private distruggiHls(): void {
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }

    if (this.videoElement) {
      const video = this.videoElement;

      video.pause();
      video.removeAttribute('src');
      video.load();

      this.videoElement = null;
    }
  }

  // ==========================================
  // DISTRUZIONE COMPONENTE
  // ==========================================

  ngOnDestroy(): void {
    this.distrutto = true;
    this.distruggiHls();
  }

  // ==========================================
  // APERTURA SITO ORIGINALE
  // ==========================================

  redirect(): void {
    const indirizzo =
      this.tipo === 'windy'
        ? (
          this.isWindyIdValido()
            ? 'https://www.windy.com/webcams/' +
            this.windyId
            : ''
        )
        : this.urlSite;

    if (!indirizzo) {
      return;
    }

    const url =
      /^https?:\/\//i.test(indirizzo)
        ? indirizzo
        : 'https://' + indirizzo;

    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    );
  }

  // ==========================================
  // MODALE IMMAGINI
  // ==========================================

  openModal(url: string): void {
    if (
      !url ||
      this.tipo !== 'immagine'
    ) {
      return;
    }

    if (!this.deviceService.isMobile()) {
      const dialogConfig =
        new MatDialogConfig();

      dialogConfig.id = 'modal-component';
      dialogConfig.width = '100%';
      dialogConfig.height = '100%';
      dialogConfig.data = url;
      dialogConfig.maxWidth = 'none';
      dialogConfig.panelClass =
        'full-screen-modal';
      dialogConfig.autoFocus = true;

      this.matDialog.open(
        ModalComponent,
        dialogConfig
      );

    } else {
      window.location.href = url;
    }
  }

  // ==========================================
  // WEBCAM FOTOGRAFICHE OFFLINE
  // ==========================================

  errorHandler(timeout: boolean): void {
    if (this.tipo !== 'immagine') {
      return;
    }

    if (
      this.urlWebcam ===
      './assets/img/webcam-offline.png'
    ) {
      this.imageLoader = false;
      return;
    }

    this.urlWebcam =
      './assets/img/webcam-offline.png';

    this.imageLoader = false;
  }
}
