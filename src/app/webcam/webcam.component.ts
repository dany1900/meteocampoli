
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  MatDialog,
  MatDialogConfig
} from '@angular/material/dialog';

import {
  DomSanitizer,
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
export class WebcamComponent implements OnInit, OnDestroy {

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
  safeVideoUrl: SafeResourceUrl | null = null;

  videoAvviato = false;
  videoError = '';
  windyError = '';
  windyCaricamento = false;

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

  // ==========================================
  // WINDY
  // ==========================================

  private readonly WINDY_SCRIPT =
    'https://webcams.windy.com/webcams/public/embed/v2/script/player.js';

  private windyHostElement: HTMLDivElement | null = null;
  private windyScriptElement: HTMLScriptElement | null = null;
  private windyInizializzato = false;
  private distrutto = false;

  @ViewChild('hlsVideo')
  set hlsVideoRef(
    ref: ElementRef<HTMLVideoElement> | undefined
  ) {
    if (
      !ref ||
      this.tipo !== 'hls' ||
      !this.videoAvviato
    ) {
      return;
    }

    const video = ref.nativeElement;

    if (this.videoElement !== video) {
      this.inizializzaHls(video);
    }
  }

  @ViewChild('windyHost')
  set windyHostRef(
    ref: ElementRef<HTMLDivElement> | undefined
  ) {
    if (
      !ref ||
      this.tipo !== 'windy' ||
      this.distrutto
    ) {
      return;
    }

    const host = ref.nativeElement;

    if (this.windyHostElement !== host) {
      this.windyHostElement = host;
      this.inizializzaWindy(host);
    }
  }

  constructor(
    private matDialog: MatDialog,
    private deviceService: DeviceDetectorService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
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
      this.imageLoader = false;

      if (!this.isWindyIdValido()) {
        this.windyError = 'ID webcam Windy non valido.';
      }
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

        if (
          url.hostname !== 'camstreamer.com' ||
          !url.pathname.startsWith('/embed/')
        ) {
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
  // PREPARAZIONE HLS
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
        this.videoError =
          'Indirizzo HLS non valido.';
        return;
      }

      const hostConsentiti = [
        '5e0add8153fcd.streamlock.net'
      ];

      if (
        !hostConsentiti.includes(
          url.hostname.toLowerCase()
        ) ||
        !url.pathname.startsWith('/vedetta/')
      ) {
        this.videoError =
          'Sorgente HLS non consentita.';
        return;
      }

      this.hlsUrl = url.href;

    } catch (error) {
      this.videoError =
        'Indirizzo streaming non valido.';

      console.error(
        'Errore URL HLS:',
        error
      );
    }
  }

  // ==========================================
  // AVVIO VIDEO YOUTUBE/IFRAME/HLS
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

    // Windy non usa più questo metodo:
    // il suo player viene mostrato subito.
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

    // Pulisce il player precedente prima
    // di assegnare quello nuovo.
    this.distruggiHls();

    this.videoElement = video;

    video.controls = true;
    video.playsInline = true;
    video.preload = 'none';

    // Safari: supporto HLS nativo.
    if (
      video.canPlayType(
        'application/vnd.apple.mpegurl'
      )
    ) {
      video.src = this.hlsUrl;
      video.load();
      this.tentaRiproduzione(video);
      return;
    }

    // Chrome / Firefox / Edge.
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
          if (
            !data.fatal ||
            this.hls !== player ||
            this.distrutto
          ) {
            return;
          }

          console.warn(
            'Errore HLS:',
            data.type,
            data.details
          );

          // Problemi di rete: recupero controllato.
          if (
            data.type ===
            Hls.ErrorTypes.NETWORK_ERROR
          ) {
            if (
              this.tentativiRete <
              this.MAX_TENTATIVI_RETE
            ) {
              this.tentativiRete++;
              player.startLoad();
              return;
            }
          }

          // Problemi multimediali.
          if (
            data.type ===
            Hls.ErrorTypes.MEDIA_ERROR
          ) {
            if (
              this.tentativiMedia <
              this.MAX_TENTATIVI_MEDIA
            ) {
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

    } else {
      this.videoError =
        'Il browser non supporta HLS.';
    }
  }

  private tentaRiproduzione(
    video: HTMLVideoElement
  ): void {
    video.play().catch(() => {
      // Il browser può richiedere
      // un clic sul Play nativo.
    });
  }

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

    // Torna all'anteprima e permette
    // un nuovo avvio senza Ctrl+F5.
    this.videoAvviato = false;
  }

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
  // WINDY - VALIDAZIONE
  // ==========================================

  private isWindyIdValido(): boolean {
    return /^[0-9]+$/.test(
      this.windyId || ''
    );
  }

  // ==========================================
  // WINDY - INIZIALIZZAZIONE PLAYER
  // ==========================================

  private inizializzaWindy(
    host: HTMLDivElement
  ): void {
    if (
      this.distrutto ||
      this.windyInizializzato
    ) {
      return;
    }

    if (!this.isWindyIdValido()) {
      this.windyError =
        'ID webcam Windy non valido.';
      return;
    }

    this.windyInizializzato = true;
    this.windyCaricamento = true;
    this.windyError = '';

    // L'anchor Windy è già presente
    // all'interno del template Angular.
    //
    // Il player ufficiale cerca gli anchor:
    // name="windy-webcam-timelapse-player"
    //
    // Aggiungiamo il suo script dopo
    // che Angular ha creato il contenitore.
    const script =
      document.createElement('script');

    script.src = this.WINDY_SCRIPT;
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => {
      if (this.distrutto) {
        return;
      }

      this.windyCaricamento = false;
    };

    script.onerror = () => {
      if (this.distrutto) {
        return;
      }

      this.windyCaricamento = false;
      this.windyError =
        'Impossibile caricare il player Windy.';

      console.error(
        'Errore caricamento player Windy'
      );
    };

    this.windyScriptElement = script;

    // Script ufficiale per ogni webcam Windy.
    // Da verificare quando molti componenti
    // vengono creati contemporaneamente.
    host.appendChild(script);
  }

  // ==========================================
  // DISTRUZIONE COMPONENTE
  // ==========================================

  ngOnDestroy(): void {
    this.distrutto = true;

    this.distruggiHls();

    if (this.windyScriptElement) {
      this.windyScriptElement.onload = null;
      this.windyScriptElement.onerror = null;
      this.windyScriptElement.remove();
      this.windyScriptElement = null;
    }

    this.windyHostElement = null;
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
    if (
      this.tipo !== 'immagine'
    ) {
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
