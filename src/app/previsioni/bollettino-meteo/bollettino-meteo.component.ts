
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

import { SEOService } from '../../service/seoservice.service';
import { Router } from '@angular/router';
import { UtiliyService } from '../../service/utiliy.service';

interface BollettinoLazioResponse {
  disponibile: boolean;
  zona: string;
  nomeZona: string;
  dataBollettino: string | null;
  urlPdf: string | null;
  livelliVerificati: boolean;
  messaggio: string;
}

@Component({
  selector: 'app-bollettino-meteo',
  templateUrl: './bollettino-meteo.component.html',
  styleUrls: ['./bollettino-meteo.component.css']
})
export class BollettinoMeteoComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  readonly zonaAllerta = 'G';
  readonly nomeZona = 'Bacino del Liri';

  readonly urlCentroFunzionale =
    'https://www.regione.lazio.it/protezione-civile/centro-funzionale-regionale';

  readonly urlBollettini =
    'https://www.regione.lazio.it/protezione-civile/centro-funzionale-regionale/bollettini-criticita-idrogeologica-idraulica';

  readonly urlAllertamenti =
    'https://www.regione.lazio.it/protezione-civile/centro-funzionale-regionale/bollettini-allertamenti';

  // Endpoint PHP presente sul server Altervista.
  // In sviluppo locale serve un proxy oppure
  // l'URL completo del server pubblicato.
  private readonly urlApiBollettino =
    '/assets/php/bollettino-lazio.php';

  bollettinoCaricamento = false;
  bollettinoErrore = '';

  bollettino: BollettinoLazioResponse | null = null;

  readonly livelliAllerta = [
    {
      nome: 'Verde',
      descrizione: 'Assenza di criticità significative previste',
      classe: 'verde'
    },
    {
      nome: 'Giallo',
      descrizione: 'Criticità ordinaria',
      classe: 'giallo'
    },
    {
      nome: 'Arancione',
      descrizione: 'Criticità moderata',
      classe: 'arancione'
    },
    {
      nome: 'Rosso',
      descrizione: 'Criticità elevata',
      classe: 'rosso'
    }
  ];

  constructor(
    private seo: SEOService,
    protected router: Router,
    public utilityService: UtiliyService,
    private http: HttpClient
  ) {
    this.title = 'Bollettino Meteo - Meteo Campoli';

    this.description =
      'Bollettini meteorologici, criticità idrogeologica e ' +
      'allertamenti della Protezione Civile Regione Lazio. ' +
      'Zona G Bacino del Liri, Campoli Appennino e Sora.';

    this.keywords =
      'bollettino meteo Lazio, allerta meteo Campoli Appennino, ' +
      'protezione civile Lazio, Bacino del Liri, zona G, ' +
      'allerta Sora, rischio idrogeologico';

    this.ogUrl =
      'https://meteocampoli.altervista.org/bollettino-meteo';

    this.ogImage = '';

    this.seo.updateMetaInfo(
      this.title,
      this.description,
      this.keywords,
      this.ogUrl,
      this.ogImage
    );

    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit(): void {
    this.utilityService.scrollToSpecifyPosition();

    // Recupera il bollettino a ogni apertura del componente.
    this.caricaBollettino();
  }

  caricaBollettino(): void {
    if (this.bollettinoCaricamento) {
      return;
    }

    this.bollettinoCaricamento = true;
    this.bollettinoErrore = '';

    // Azzera il documento precedente durante
    // una nuova verifica.
    this.bollettino = null;

    this.http.get<BollettinoLazioResponse>(
      this.urlApiBollettino,
      {
        params: {
          _: Date.now().toString()
        }
      }
    )
      .pipe(
        finalize(() => {
          this.bollettinoCaricamento = false;
        })
      )
      .subscribe({
        next: dati => {

          if (
            !dati ||
            typeof dati.disponibile !== 'boolean' ||
            dati.zona !== this.zonaAllerta
          ) {
            this.bollettinoErrore =
              'Risposta del servizio bollettini non valida.';
            return;
          }

          // Accetta soltanto documenti ufficiali
          // con URL HTTPS della Regione Lazio.
          if (dati.disponibile && dati.urlPdf) {

            try {
              const url = new URL(dati.urlPdf);

              if (
                url.protocol !== 'https:' ||
                url.hostname !== 'www.regione.lazio.it' ||
                !url.pathname.toLowerCase().endsWith('.pdf')
              ) {
                this.bollettinoErrore =
                  'Indirizzo del documento non valido.';
                return;
              }

            } catch (error) {
              this.bollettinoErrore =
                'Indirizzo del documento non valido.';
              return;
            }
          }

          this.bollettino = dati;

          if (!dati.disponibile) {
            this.bollettinoErrore =
              dati.messaggio ||
              'Nessun bollettino disponibile.';
          }
        },

        error: errore => {
          console.error(
            'Errore recupero bollettino Regione Lazio:',
            errore
          );

          this.bollettinoErrore =
            'Impossibile recuperare automaticamente ' +
            'il bollettino regionale. ' +
            'Consulta il portale ufficiale.';
        }
      });
  }

  get documentoDisponibile(): boolean {
    return !!(
      this.bollettino &&
      this.bollettino.disponibile &&
      this.bollettino.urlPdf &&
      this.bollettino.dataBollettino
    );
  }

  get dataDocumentoFormattata(): string {
    if (
      !this.bollettino ||
      !this.bollettino.dataBollettino
    ) {
      return '';
    }

    const parti = this.bollettino.dataBollettino.split('-');

    if (parti.length !== 3) {
      return this.bollettino.dataBollettino;
    }

    return parti[2] + '/' + parti[1] + '/' + parti[0];
  }

  get documentoOdierno(): boolean {
    if (
      !this.bollettino ||
      !this.bollettino.dataBollettino
    ) {
      return false;
    }

    const oggi = new Date();

    const anno = oggi.getFullYear();
    const mese = String(oggi.getMonth() + 1).padStart(2, '0');
    const giorno = String(oggi.getDate()).padStart(2, '0');

    const dataOggi = anno + '-' + mese + '-' + giorno;

    return this.bollettino.dataBollettino === dataOggi;
  }
}
