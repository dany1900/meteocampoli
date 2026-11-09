import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
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

type ColoreAllerta = 'verde' | 'giallo' | 'arancione' | 'rosso' | null;

interface GiornoAllerta {
  data: string;
  inizioValidita: string;
  fineValidita: string;
  pubblicatoIl: string;
  livelli: {
    idrogeologico: ColoreAllerta;
    temporali: ColoreAllerta;
    idraulico: ColoreAllerta;
  };
}

interface RispostaAllerteZonaG {
  zona: string;
  nomeZona: string;
  fonte: string;
  verificato: boolean;
  ultimoControllo: string;
  oggi: GiornoAllerta | null;
  domani: GiornoAllerta | null;
  errore: string | null;
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

  // In locale configurare un proxy o usare l'URL pubblico di Altervista.
  private readonly urlApiBollettino = '/assets/php/bollettino-lazio.php';
  private readonly urlApiPdfZonaG = '/assets/php/pdf-zona-g.php';
  private richiestaPdf = 0;

  bollettinoCaricamento = false;
  bollettinoErrore = '';
  bollettino: BollettinoLazioResponse | null = null;
  pdfAnteprimaUrl: SafeResourceUrl | null = null;

  allerteCaricamento = false;
  allerteErrore = '';
  allerteZonaG: RispostaAllerteZonaG | null = null;

  readonly rischiAllerta = [
    { chiave: 'idrogeologico', nome: 'Rischio idrogeologico' },
    { chiave: 'temporali', nome: 'Rischio temporali' },
    { chiave: 'idraulico', nome: 'Rischio idraulico' }
  ];

  readonly livelliAllerta = [
    { nome: 'Verde', descrizione: 'Assenza di criticità significative previste', classe: 'verde' },
    { nome: 'Giallo', descrizione: 'Criticità ordinaria', classe: 'giallo' },
    { nome: 'Arancione', descrizione: 'Criticità moderata', classe: 'arancione' },
    { nome: 'Rosso', descrizione: 'Criticità elevata', classe: 'rosso' }
  ];

  constructor(
    private seo: SEOService,
    protected router: Router,
    public utilityService: UtiliyService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.title = 'Bollettino Meteo e Allertamento - Meteo Campoli';
    this.description =
      'Bollettini e allerte meteo. ' +
      'Consulta criticità idrogeologiche, rischio temporali e allertamenti.';
    this.keywords =
      'bollettino meteo Lazio, allerta meteo Lazio, ' +
      'allerta meteo Campoli Appennino, allerta meteo Sora, ' +
      'Protezione Civile Regione Lazio, bollettino criticità, ' +
      'allerta idrogeologica Lazio, rischio temporali, ' +
      'rischio idraulico, allerta gialla, allerta arancione, ' +
      'allerta rossa, Zona G Bacino del Liri, ' +
      'previsioni meteo Frosinone, allerte meteo Ciociaria';
    this.ogUrl =
      'https://meteocampoli.altervista.org/previsioni/bollettino-meteo';
    this.ogImage = '';
    this.seo.updateMetaInfo(
      this.title, this.description, this.keywords, this.ogUrl, this.ogImage
    );
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit(): void {
    this.utilityService.scrollToSpecifyPosition();
    this.caricaBollettino();
  }

  get allerteGiorni(): { titolo: string; dati: GiornoAllerta | null }[] {
    return [
      { titolo: 'Oggi', dati: this.allerteZonaG?.oggi || null },
      { titolo: 'Domani', dati: this.allerteZonaG?.domani || null }
    ];
  }

  leggiColore(giorno: GiornoAllerta | null, rischio: string): ColoreAllerta {
    if (!giorno || !giorno.livelli) { return null; }
    switch (rischio) {
      case 'idrogeologico': return giorno.livelli.idrogeologico;
      case 'temporali': return giorno.livelli.temporali;
      case 'idraulico': return giorno.livelli.idraulico;
      default: return null;
    }
  }

  nomeColore(colore: ColoreAllerta): string {
    switch (colore) {
      case 'verde': return 'Verde - Nessuna allerta';
      case 'giallo': return 'Allerta gialla';
      case 'arancione': return 'Allerta arancione';
      case 'rosso': return 'Allerta rossa';
      default: return 'Non disponibile';
    }
  }

  classeColore(colore: ColoreAllerta): string {
    const coloriValidi = ['verde', 'giallo', 'arancione', 'rosso'];
    return 'bm-alert-' + (colore && coloriValidi.includes(colore) ? colore : 'non-disponibile');
  }

  /** In questa versione i colori vengono letti dal PDF regionale con PDF.js. */
  caricaAllerteZonaG(): void {
    this.caricaBollettino();
  }

  /** Raggruppa i frammenti PDF.js in righe rispettando le coordinate. */
  private righePrimaPagina(items: any[]): string[] {
    const righe: { y: number; elementi: { x: number; testo: string }[] }[] = [];
    for (const item of items) {
      const testo = String(item.str || '').trim();
      if (!testo || !item.transform) { continue; }
      const x = Number(item.transform[4]);
      const y = Number(item.transform[5]);
      if (!Number.isFinite(x) || !Number.isFinite(y)) { continue; }
      let riga = righe.find(r => Math.abs(r.y - y) < 2.5);
      if (!riga) {
        riga = { y, elementi: [] };
        righe.push(riga);
      }
      riga.elementi.push({ x, testo });
    }
    return righe.sort((a, b) => b.y - a.y).map(r =>
      r.elementi.sort((a, b) => a.x - b.x)
        .map(e => e.testo).join(' ').replace(/\s+/g, ' ').trim()
    );
  }

  /** Estrae solo tabelle complete e datate: nessun verde dedotto dal CAP. */
  private estraiTabelleZonaG(righe: string[]): Map<string, GiornoAllerta['livelli']> {
    const tabelle = new Map<string, GiornoAllerta['livelli']>();
    const testo = righe.join('\n').replace(/\u00a0/g, ' ');
    const intestazioni: RegExpExecArray[] = [];
    const regexIntestazione = /Valutazioni\s+per\s+(OGGI|DOMANI)\s*[,;:]?\s*(\d{2}\/\d{2}\/\d{4})/gi;
    let intestazione: RegExpExecArray | null;
    while ((intestazione = regexIntestazione.exec(testo)) !== null) {
      intestazioni.push(intestazione);
    }
    if (intestazioni.length !== 2 ||
      intestazioni[0][1].toUpperCase() !== 'OGGI' ||
      intestazioni[1][1].toUpperCase() !== 'DOMANI') {
      return tabelle;
    }
    const colore = '(VERDE|GIALLO|ARANCIONE|ROSSO)';
    const regexRiga = new RegExp('(?:^|\\s)([A-G])\\s+' + colore +
      '\\s+' + colore + '\\s+' + colore + '(?=\\s|$)', 'gi');
    for (let i = 0; i < 2; i++) {
      const h = intestazioni[i];
      const dataPdf = h[2];
      const [gg, mm, aaaa] = dataPdf.split('/');
      const data = `${aaaa}-${mm}-${gg}`;
      const dataControllo = new Date(`${data}T12:00:00+01:00`);
      if (Number.isNaN(dataControllo.getTime()) ||
        dataControllo.getUTCDate() !== Number(gg) ||
        dataControllo.getUTCMonth() + 1 !== Number(mm)) { continue; }
      const inizio = (h.index || 0) + h[0].length;
      const fine = i === 0 ? (intestazioni[1].index || testo.length) : testo.length;
      let blocco = testo.substring(inizio, fine);
      const stop = blocco.search(/(?:ZONE DI ALLERTA|Assenza di fenomeni significativi|Pag\.\s*1\/2)/i);
      if (stop >= 0) { blocco = blocco.substring(0, stop); }
      if (!/IDROGEOLOGIC/i.test(blocco) || !/IDRAULIC/i.test(blocco)) { continue; }
      const trovate: { [key: string]: string[] } = {};
      const doppie = new Set<string>();
      regexRiga.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = regexRiga.exec(blocco)) !== null) {
        const lettera = m[1].toUpperCase();
        if (trovate[lettera]) { doppie.add(lettera); }
        trovate[lettera] = [m[2].toLowerCase(), m[3].toLowerCase(), m[4].toLowerCase()];
      }
      // Verifica la tabella intera: impedisce di leggere la legenda come riga G.
      if (Object.keys(trovate).length !== 7 || doppie.size > 0 || !trovate['G']) {
        continue;
      }
      tabelle.set(data, {
        idrogeologico: trovate['G'][0] as ColoreAllerta,
        temporali: trovate['G'][1] as ColoreAllerta,
        idraulico: trovate['G'][2] as ColoreAllerta
      });
    }
    return tabelle;
  }

  private costruisciGiorno(data: string, livelli: GiornoAllerta['livelli'],
                           pubblicatoIl: string): GiornoAllerta {
    // Gli ISO con offset locale sono usati per il calendario; Angular mostra le date
    // italiane tramite la pipe Date già presente nell'HTML.
    return {
      data,
      // Date locali interpretate correttamente dalle pipe Angular.
      inizioValidita: data + 'T00:00:00',
      fineValidita: data + 'T23:59:59',
      pubblicatoIl,
      livelli
    };
  }

  private async leggiLivelliDaPdf(dataDocumento: string, richiesta: number): Promise<void> {
    this.allerteCaricamento = true;
    this.allerteErrore = '';
    this.allerteZonaG = null;

    // Evita un caricamento infinito se il worker PDF.js non risponde.
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let loadingTask: ReturnType<typeof pdfjsLib.getDocument> | null = null;
    let worker: Worker | null = null;

    try {
      console.log('[Zona G] Inizio lettura PDF:', dataDocumento);
      console.log('[Zona G] Versione PDF.js:', pdfjsLib.version);

      const bytes = await this.http.get(this.urlApiPdfZonaG, {
        params: { data: dataDocumento, _: Date.now().toString() },
        responseType: 'arraybuffer'
      }).toPromise();

      console.log('[Zona G] PDF scaricato:', bytes?.byteLength, 'byte');
      if (!bytes || richiesta !== this.richiestaPdf) { return; }
      if (new TextDecoder('ascii').decode(new Uint8Array(bytes, 0, Math.min(5, bytes.byteLength))) !== '%PDF-') {
        throw new Error('Il proxy non ha restituito un PDF valido (%PDF- assente).');
      }

      // Worker esplicito: usare il file 3.11.174 pubblicato negli assets.
      // Non creare un worker a ogni refresh senza poi terminarlo.
      worker = new Worker('/assets/pdfjs/pdf.worker.min.js');
      worker.onerror = (evento: ErrorEvent) => {
        console.error('[Zona G] Errore JavaScript nel worker:', evento.message, evento);
      };
      pdfjsLib.GlobalWorkerOptions.workerPort = worker;
      console.log('[Zona G] Worker creato:', worker);
      console.log('[Zona G] Apertura PDF.js...');

      loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(bytes) });
      const task = loadingTask;
      const timeout = new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error('Timeout PDF.js: apertura documento oltre 15 secondi'));
        }, 15000);
      });
      const documento = await Promise.race([task.promise, timeout]);
      if (timeoutId !== null) { clearTimeout(timeoutId); timeoutId = null; }
      console.log('[Zona G] PDF aperto correttamente, pagine:', documento.numPages);

      let righe: string[];
      try {
        console.log('[Zona G] Lettura prima pagina...');
        const pagina = await documento.getPage(1);
        const contenuto = await pagina.getTextContent();
        console.log('[Zona G] Frammenti di testo trovati:', contenuto.items.length);
        righe = this.righePrimaPagina(contenuto.items as any[]);
        console.log('[Zona G] Righe ricostruite:', righe.length);
        // Per capire eventuali variazioni di formato della tabella.
        console.log('[Zona G] Anteprima righe PDF:', righe.slice(0, 35));
      } finally {
        await documento.destroy();
      }
      if (richiesta !== this.richiestaPdf) { return; }

      const tabelle = this.estraiTabelleZonaG(righe);
      console.log('[Zona G] Date delle tabelle riconosciute:', Array.from(tabelle.keys()));
      const oggi = this.dataOdiernaIso;
      const tomorrow = new Date(`${oggi}T12:00:00`);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const domani = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
      const oggiLivelli = tabelle.get(oggi);
      const domaniLivelli = tabelle.get(domani);
      const verificato = !!(oggiLivelli || domaniLivelli);
      this.allerteZonaG = {
        zona: 'Lazi-G', nomeZona: 'Bacino del Liri',
        fonte: 'PDF ufficiale Regione Lazio - lettura PDF.js',
        verificato, ultimoControllo: new Date().toISOString(),
        oggi: oggiLivelli ? this.costruisciGiorno(oggi, oggiLivelli, dataDocumento) : null,
        domani: domaniLivelli ? this.costruisciGiorno(domani, domaniLivelli, dataDocumento) : null,
        errore: verificato ? null : 'La tabella della Zona G non è stata riconosciuta nel PDF.'
      };
      if (!verificato) { this.allerteErrore = this.allerteZonaG.errore || ''; }
      console.log('[Zona G] Esito parser:', this.allerteZonaG);
    } catch (e) {
      if (richiesta !== this.richiestaPdf) { return; }
      console.error('[Zona G] Lettura PDF fallita:', e);
      this.allerteErrore = 'Impossibile leggere automaticamente il PDF regionale. Consulta il bollettino ufficiale.';
    } finally {
      if (timeoutId !== null) { clearTimeout(timeoutId); }
      // Se getDocument resta bloccato, rilascia le risorse senza aspettare.
      if (loadingTask) { void loadingTask.destroy().catch(() => {}); }
      if (worker) {
        if (pdfjsLib.GlobalWorkerOptions.workerPort === worker) {
          pdfjsLib.GlobalWorkerOptions.workerPort = null as any;
        }
        worker.terminate();
      }
      if (richiesta === this.richiestaPdf) { this.allerteCaricamento = false; }
    }
  }

  caricaBollettino(): void {
    if (this.bollettinoCaricamento) { return; }
    const richiesta = ++this.richiestaPdf;
    this.bollettinoCaricamento = true;
    this.allerteZonaG = null;
    this.allerteErrore = '';
    this.bollettinoErrore = '';
    this.bollettino = null;
    this.pdfAnteprimaUrl = null;

    this.http.get<BollettinoLazioResponse>(this.urlApiBollettino, {
      params: { _: Date.now().toString() }
    }).pipe(
      finalize(() => { this.bollettinoCaricamento = false; })
    ).subscribe({
      next: dati => {
        if (!dati || typeof dati.disponibile !== 'boolean' ||
          dati.zona !== this.zonaAllerta) {
          this.bollettinoErrore = 'Risposta del servizio bollettini non valida.';
          return;
        }
        if (dati.disponibile && dati.urlPdf) {
          try {
            const url = new URL(dati.urlPdf);
            if (url.protocol !== 'https:' ||
              url.hostname !== 'www.regione.lazio.it' ||
              !url.pathname.toLowerCase().endsWith('.pdf')) {
              this.bollettinoErrore = 'Indirizzo del documento non valido.';
              return;
            }
          } catch (error) {
            this.bollettinoErrore = 'Indirizzo del documento non valido.';
            return;
          }
        }
        this.bollettino = dati;
        if (dati.disponibile && dati.urlPdf && dati.dataBollettino) {
          // Legge la prima pagina del PDF anche quando il server non ha pdftotext.
          void this.leggiLivelliDaPdf(dati.dataBollettino, richiesta);
          this.pdfAnteprimaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            dati.urlPdf + '#page=1&zoom=page-width&navpanes=0&pagemode=none&toolbar=0'
          );

        }
        if (!dati.disponibile) {
          this.bollettinoErrore = dati.messaggio || 'Nessun bollettino disponibile.';
        }
      },
      error: errore => {
        console.error('Errore recupero bollettino Regione Lazio:', errore);
        this.bollettinoErrore =
          'Impossibile recuperare automaticamente il bollettino regionale. ' +
          'Consulta il portale ufficiale.';
      }
    });
  }

  // Il PDF e' disponibile solo se l'endpoint ha verificato il documento.
  // Mai usare URL costruiti dalla data: potrebbero restituire 404.
  get documentoDisponibile(): boolean {
    return !!(
      this.bollettino && this.bollettino.disponibile &&
      this.bollettino.urlPdf && this.bollettino.dataBollettino
    );
  }

  get documentoPrecedente(): boolean {
    return this.documentoDisponibile && !this.documentoOdierno;
  }

  // Data italiana, anche se il visitatore ha un fuso orario diverso.
  get dataOdiernaItalia(): string {
    const parti = new Intl.DateTimeFormat('it-IT', {
      timeZone: 'Europe/Rome', day: '2-digit', month: '2-digit', year: 'numeric'
    }).formatToParts(new Date());
    const giorno = parti.find(p => p.type === 'day')?.value || '';
    const mese = parti.find(p => p.type === 'month')?.value || '';
    const anno = parti.find(p => p.type === 'year')?.value || '';
    return giorno + '/' + mese + '/' + anno;
  }

  get dataOdiernaIso(): string {
    const [giorno, mese, anno] = this.dataOdiernaItalia.split('/');
    return anno + '-' + mese + '-' + giorno;
  }

  get dataDocumentoFormattata(): string {
    if (!this.bollettino || !this.bollettino.dataBollettino) { return ''; }
    const parti = this.bollettino.dataBollettino.split('-');
    return parti.length === 3
      ? parti[2] + '/' + parti[1] + '/' + parti[0]
      : this.bollettino.dataBollettino;
  }

  get documentoOdierno(): boolean {
    return this.documentoDisponibile &&
      this.bollettino!.dataBollettino === this.dataOdiernaIso;
  }
}
