import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SEOService } from '../../service/seoservice.service';
import { Router } from '@angular/router';
import { UtiliyService } from '../../service/utiliy.service';

interface StazioneMeteomontRaw {
  id_staz?: string;
  campo_ril?: string;
  desc_comu?: string;
  codi_sigl_prov?: string;
  deno_sett?: string;
  codiRegi?: string;
  alt_tot_neve_cm?: string | number | null;
  alt_neve_24hh_cm?: string | number | null;
  temp_min?: string | number | null;
  temp_max?: string | number | null;
  dataUltimoRilievo?: string | null;
  geo_n_y?: number | null; // ATTENZIONE: e' LONGITUDINE nel JSON Meteomont
  geo_e_x?: number | null; // ATTENZIONE: e' LATITUDINE nel JSON Meteomont
}

interface RispostaMeteomont {
  fonte?: string;
  aggiornamentoServer?: string;
  stazioni?: StazioneMeteomontRaw[];
  errore?: string;
}

type Zona = 'centro' | 'nord' | 'sud';

interface StazioneMeteomont {
  id: string;
  nome: string;
  comune: string;
  provincia: string;
  settore: string;
  zona: Zona;
  neveCm: number | null;
  neve24hCm: number | null;
  minima: number | null;
  massima: number | null;
  rilievo: Date | null;
  rilievoTesto: string;
  latitudine: number | null;
  longitudine: number | null;
}

@Component({
  selector: 'app-neve-montagna',
  templateUrl: './neve-montagna.component.html',
  styleUrls: ['./neve-montagna.component.css']
})
export class NeveMontagnaComponent implements OnInit {
  title = 'Neve e Temperature Monti - Meteo Campoli';
  description = 'Monitoraggio neve al suolo, neve fresca, temperature minime e massime delle stazioni manuali Meteomont dei Carabinieri.';
  keywords = 'neve in montagna, situazione neve oggi, altezza neve, neve al suolo, neve fresca ultime 24 ore, accumuli neve, monitoraggio neve, temperature montagna, temperature minime e massime, stazioni Meteomont, Meteomont Carabinieri, rilevazioni neve, neve Appennino centrale, neve Lazio, neve Abruzzo, neve Molise, neve Marche, neve Appennino, neve Alpi, Campo Imperatore, Campo Catino, Forca d’Acero, Prati di Mezzo, innevamento Italia, Meteo Campoli';
  ogUrl = 'https://meteocampoli.altervista.org/riepilogo/neve-montagna';
  ogImage = '';

  readonly zone: Array<{ id: Zona; nome: string }> = [
    { id: 'centro', nome: 'Centro Italia' },
    { id: 'nord', nome: 'Nord Italia' },
    { id: 'sud', nome: 'Sud e Isole' }
  ];

  zonaSelezionata: Zona = 'centro';
  ricerca = '';
  soloConNeve = false;
  soloRecenti = false;
  ordinamento = 'recenti';
  caricamento = true;
  errore = '';
  datiDiRiserva = false;
  caricate: StazioneMeteomont[] = [];
  visualizzate: StazioneMeteomont[] = [];
  ultimoCaricamento: Date | null = null;
  readonly finestraRecenteOre = 48;
  // Il componente non conosce la quota altimetrica della stazione: non inventarla.

  constructor(
    private seo: SEOService,
    protected router: Router,
    public renderer: Renderer2,
    public utilityService: UtiliyService,
    private http: HttpClient
  ) {
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit(): void {
    this.utilityService.scrollToSpecifyPosition();
    this.caricaStazioni();
  }

  caricaStazioni(): void {
    this.caricamento = true;
    this.errore = '';
    this.http.get<RispostaMeteomont | StazioneMeteomontRaw[]>('/assets/php/meteomont-stazioni.php')
      .subscribe({
        next: (risposta) => {
          const dati = Array.isArray(risposta) ? risposta : risposta.stazioni;
          if (!Array.isArray(dati) || !dati.length) {
            this.caricaDatiDiRiserva('La sorgente Meteomont non ha restituito stazioni.');
            return;
          }
          this.applicaDati(dati, false);
        },
        error: () => this.caricaDatiDiRiserva('Impossibile aggiornare le stazioni Meteomont in questo momento.')
      });
  }

  private caricaDatiDiRiserva(messaggio: string): void {
    this.errore = messaggio;
    this.http.get<StazioneMeteomontRaw[]>('/assets/data/meteomont-stazioni-snapshot.json')
      .subscribe({
        next: (dati) => this.applicaDati(dati, true),
        error: () => {
          this.caricamento = false;
          this.caricate = [];
          this.aggiornaFiltri();
          this.errore += ' Anche il file di riserva non è accessibile.';
        }
      });
  }

  private applicaDati(dati: StazioneMeteomontRaw[], riserva: boolean): void {
    this.caricate = dati.map((dato, index) => this.normalizza(dato, index));
    this.datiDiRiserva = riserva;
    this.ultimoCaricamento = new Date();
    this.caricamento = false;
    if (!riserva) { this.errore = ''; }
    this.aggiornaFiltri();
  }

  private normalizza(dato: StazioneMeteomontRaw, index: number): StazioneMeteomont {
    const data = this.leggiData(dato.dataUltimoRilievo);
    return {
      id: dato.id_staz || String(index),
      nome: dato.campo_ril || 'Stazione senza nome',
      comune: dato.desc_comu || '',
      provincia: dato.codi_sigl_prov || '',
      settore: dato.deno_sett || '',
      zona: this.zonaDaRegione(dato.codiRegi),
      neveCm: this.numero(dato.alt_tot_neve_cm),
      neve24hCm: this.numero(dato.alt_neve_24hh_cm),
      minima: this.numero(dato.temp_min),
      massima: this.numero(dato.temp_max),
      rilievo: data,
      rilievoTesto: dato.dataUltimoRilievo || 'Non disponibile',
      longitudine: typeof dato.geo_n_y === 'number' ? dato.geo_n_y : null,
      latitudine: typeof dato.geo_e_x === 'number' ? dato.geo_e_x : null
    };
  }

  private zonaDaRegione(codice?: string): Zona {
    const regione = Number(codice);
    if ([9, 10, 11, 12, 13, 14].indexOf(regione) >= 0) { return 'centro'; }
    if ([15, 16, 17, 18, 19, 20].indexOf(regione) >= 0) { return 'sud'; }
    return 'nord';
  }

  private numero(valore: string | number | null | undefined): number | null {
    if (valore === null || valore === undefined) { return null; }
    const testo = String(valore).trim().replace(',', '.');
    if (!testo || testo.toUpperCase() === 'N.P.') { return null; }
    const numero = Number(testo);
    return isFinite(numero) ? numero : null;
  }

  private leggiData(valore?: string | null): Date | null {
    if (!valore) { return null; }
    const parti = valore.split('/');
    if (parti.length !== 3) { return null; }
    const giorno = Number(parti[0]);
    const mese = Number(parti[1]);
    const anno = Number(parti[2]);
    const data = new Date(anno, mese - 1, giorno);
    if (data.getFullYear() !== anno || data.getMonth() !== mese - 1 || data.getDate() !== giorno) {
      return null;
    }
    return data;
  }

  selezionaZona(zona: Zona): void {
    this.zonaSelezionata = zona;
    this.aggiornaFiltri();
  }

  aggiornaFiltri(): void {
    const ricerca = this.ricerca.trim().toLocaleLowerCase('it-IT');
    this.visualizzate = this.caricate.filter(stazione => {
      if (stazione.zona !== this.zonaSelezionata) { return false; }
      if (this.soloConNeve && !(stazione.neveCm !== null && stazione.neveCm > 0)) { return false; }
      if (this.soloRecenti && !this.eRecente(stazione)) { return false; }
      if (!ricerca) { return true; }
      return [stazione.nome, stazione.comune, stazione.provincia, stazione.settore]
        .some(campo => campo.toLocaleLowerCase('it-IT').indexOf(ricerca) >= 0);
    });
    this.visualizzate.sort((a, b) => {
      if (this.ordinamento === 'neve') {
        return (b.neveCm === null ? -1 : b.neveCm) - (a.neveCm === null ? -1 : a.neveCm);
      }
      if (this.ordinamento === 'nome') {
        return a.nome.localeCompare(b.nome, 'it');
      }
      return (b.rilievo ? b.rilievo.getTime() : 0) - (a.rilievo ? a.rilievo.getTime() : 0);
    });
  }

  contaZona(zona: Zona): number {
    return this.caricate.filter(stazione => stazione.zona === zona).length;
  }

  get contaConNeve(): number {
    return this.visualizzate.filter(stazione => stazione.neveCm !== null && stazione.neveCm > 0).length;
  }

  get rilievoPiuRecente(): Date | null {
    return this.visualizzate.reduce<Date | null>((ultimo, stazione) => {
      return stazione.rilievo && (!ultimo || stazione.rilievo > ultimo) ? stazione.rilievo : ultimo;
    }, null);
  }

  eRecente(stazione: StazioneMeteomont): boolean {
    if (!stazione.rilievo) { return false; }
    // dataUltimoRilievo fornisce solo il giorno, quindi tolleranza di 1 giorno.
    const ore = (Date.now() - stazione.rilievo.getTime()) / 3600000;
    return ore >= -24 && ore <= this.finestraRecenteOre + 24;
  }

  temperatura(valore: number | null): string {
    if (valore === null) { return 'N/D'; }
    return (valore > 0 ? '+' : '') + String(valore).replace('.', ',') + ' °C';
  }

  cm(valore: number | null): string {
    return valore === null ? 'N/D' : String(valore).replace('.', ',') + ' cm';
  }

  linkMappa(stazione: StazioneMeteomont): string | null {
    if (stazione.latitudine === null || stazione.longitudine === null) { return null; }
    return 'https://www.google.com/maps?q=' + stazione.latitudine + ',' + stazione.longitudine;
  }

  trackStazione(_indice: number, stazione: StazioneMeteomont): string {
    return stazione.id;
  }
}
