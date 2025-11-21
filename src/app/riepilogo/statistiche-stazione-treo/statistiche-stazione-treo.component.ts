import {AfterViewInit, Component, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FormBuilder, FormControl} from '@angular/forms';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';
import {HttpClient} from '@angular/common/http';
import {AnnualRaw, DatoGiornalieroRaw, StatisticheStazioneTreoInterface} from './statistiche-stazione-treo.interface';
import {FileService} from '../../service/file.service';

@Component({
  selector: 'statistiche-stazione-treo',
  templateUrl: './statistiche-stazione-treo.component.html',
  styleUrls: ['./statistiche-stazione-treo.component.css']
})
export class StatisticheStazioneTreoComponent implements OnInit, AfterViewInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  imageLoader = true;
  imageLoaderAnno = true;
  arrResponse: StatisticheStazioneTreoInterface[] = [];
  arrResponseAnno: StatisticheStazioneTreoInterface[] = [];
  displayedColumns: string[] = ['giorno', 'tempMin', 'tempMax', 'tempMedia', 'vento', 'pressione', 'umidita', 'pioggia'];
  displayedColumnsAnno: string[] = ['tempMin', 'tempMax', 'tempMedia', 'vento', 'pressione', 'pioggiaGiornalieraMax', 'pioggia'];
  dataSource = new MatTableDataSource<StatisticheStazioneTreoInterface>(this.arrResponse);
  dataSourceAnno = new MatTableDataSource<StatisticheStazioneTreoInterface>(this.arrResponseAnno);
  isVisible = false;
  isVisibleAnno = false;

  @ViewChild('paginatorMensile') paginator: MatPaginator;

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.dataSource.sort) {
      this.dataSource.sort = sort;
    }
  }

  @ViewChild('paginatorAnnuale') paginatorAnno: MatPaginator;

  @ViewChild(MatSort) set matSortAnno(sort: MatSort) {
    if (!this.dataSourceAnno.sort) {
      this.dataSourceAnno.sort = sort;
    }
  }

  paginatorLengthMensile = 400;
  paginatorLengthAnnuale = 9999;

  public currentPage;
  public currentPageAnno = 1;
  public month: string;
  public year: number;
  public yearMonth: number;
  public today: Date;
  public precYear: number;
  public dateControl = new FormControl(new Date());
  @Output() dataLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  cacheAnnuale: { [anno: number]: DatoGiornalieroRaw[] } = {};
  annualStats: AnnualRaw | null = null;

  months: string[] = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  constructor(
    private seo: SEOService,
    protected router: Router,
    public utilityService: UtiliyService,
    private http: HttpClient,
    public renderer: Renderer2,
    private fb: FormBuilder,
    private fileService: FileService
  ) {
    this.title = 'Statistiche Stazione Loc.Prato - Meteo Campoli';
    this.description = 'Riepilogo stazione meteo Campoli Appennino Località Prato. Tutte le statistiche giornaliere, mensili e annuali complete.';
    this.keywords = 'statistiche meteo campoli, stazione meteo prato campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/riepilogo/stazione-prato';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
    this.today = new Date();
    this.year = this.today.getFullYear();
    this.yearMonth = this.year;
    this.month = (this.today.getMonth() + 1).toString().padStart(2, '0');
    this.currentPage = this.today.getMonth();
    this.precYear = this.year;

    this.loadCumulusDayFileData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceAnno.paginator = this.paginatorAnno;
  }

  async loadCumulusDayFileData(): Promise<void> {

    const selectedDate = this.dateControl.value;
    this.year = selectedDate.getFullYear();
    const monthNum = selectedDate.getMonth() + 1;
    this.month = monthNum.toString().padStart(2, '0');

    this.imageLoader = true;
    this.imageLoaderAnno = true;
    this.isVisible = false;
    this.isVisibleAnno = false;

    try {

      // helpers
      const num = (a: number[]) => a.filter(v => typeof v === 'number' && !isNaN(v));
      const min = (a: number[]) => Math.min(...num(a));
      const max = (a: number[]) => Math.max(...num(a));
      const avg = (a: number[]) => {
        const v = num(a);
        return v.length ? v.reduce((s, x) => s + x, 0) / v.length : NaN;
      };
      const sum = (a: number[]) => num(a).reduce((s, x) => s + x, 0);

      let datiAnno: DatoGiornalieroRaw[] = [];
      let datiMese: DatoGiornalieroRaw[] = [];

      // ================================================================
      // 1️⃣ CARICO ANNO (annualStats + dayfile)
      // ================================================================
      if (this.cacheAnnuale[this.year]) {

        datiAnno = this.cacheAnnuale[this.year];

      } else {

        // 🔹 ANNI < 2025 — YEAR.XML COMPLETO + DAYFILE
        if (this.year < 2025) {

          console.warn("Carico year.xml PRE-2025", this.year);

          this.annualStats = await this.loadXmlYearStats(this.year);

          console.warn("annualStats:", this.annualStats);

          const txt = await this.http.get(
            'assets/storico-treo/dayfile.txt?v=' + Date.now(),
            { responseType: 'text' }
          ).toPromise();

          datiAnno = this.parseDayfile(txt, this.year);
        }


        // 🔹 ANNO 2025 — YEAR.XML GEN–AGO + DAYFILE COMPLETO (SET–DIC dopo)
        else if (this.year === 2025) {
          this.annualStats = await this.loadXmlYearStats(2025);

          const txt = await this.http.get(
            'assets/storico-treo/dayfile.txt?v=' + Date.now(),
            { responseType: 'text' }
          ).toPromise();

          datiAnno = this.parseDayfile(txt, 2025);
        }

        // 🔹 ANNI > 2025 — SOLO DAYFILE
        else {
          const txt = await this.http.get(
            'assets/storico-treo/dayfile.txt?v=' + Date.now(),
            { responseType: 'text' }
          ).toPromise();

          datiAnno = this.parseDayfile(txt, this.year);
        }

        this.cacheAnnuale[this.year] = datiAnno;
      }

      // ================================================================
      // 2️⃣ CARICO MESE (solo quello richiesto)
      // ================================================================
      if (this.year < 2025) {
        datiMese = await this.loadXmlMonthlyData(this.year, monthNum);
      }
      else if (this.year === 2025) {
        if (monthNum <= 8) datiMese = await this.loadXmlMonthlyData(2025, monthNum);
        else datiMese = datiAnno.filter(d => d.mese === monthNum);
      }
      else {
        datiMese = datiAnno.filter(d => d.mese === monthNum);
      }

      // ================================================================
      // 3️⃣ SE MENSILE VUOTO
      // ================================================================
      if (!datiMese.length) {
        this.arrResponse = [{
          giorno: `Nessun dato per ${this.getMonthName(this.month)} ${this.year}`,
          tempMin: '-', tempMax: '-', tempMedia: '-', ventoMax: '-',
          pressioneMin: '-', pressioneMax: '-', umiditaMin: '-', umiditaMax: '-', pioggia: '-'
        }];
        this.dataSource.data = this.arrResponse;
        return;
      }

      // ================================================================
      // 4️⃣ COSTRUZIONE MENSILE
      // ================================================================
      const giorniOrd = [...datiMese].sort((a, b) => Number(a.giorno) - Number(b.giorno));

      const mensileRaw = {
        tempMin: min(datiMese.map(d => d.tempMin)),
        tempMax: max(datiMese.map(d => d.tempMax)),
        tempMedia: avg(datiMese.map(d => d.tempMedia)),
        ventoMax: max(datiMese.map(d => d.ventoMax)),
        pressioneMin: min(datiMese.map(d => d.pressioneMin)),
        pressioneMax: max(datiMese.map(d => d.pressioneMax)),
        umiditaMin: min(datiMese.map(d => d.umiditaMin)),
        umiditaMax: max(datiMese.map(d => d.umiditaMax)),
        pioggia: sum(datiMese.map(d => d.pioggia)),
        pioggiaGiornalieraMax: max(datiMese.map(d => d.pioggia))
      };

      this.arrResponse = [
        ...giorniOrd.map(g => ({
          giorno: g.giorno,
          tempMin: g.tempMin.toFixed(1),
          tempMax: g.tempMax.toFixed(1),
          tempMedia: g.tempMedia.toFixed(1),
          ventoMax: g.ventoMax.toFixed(1),
          pressioneMin: g.pressioneMin.toFixed(1),
          pressioneMax: g.pressioneMax.toFixed(1),
          umiditaMin: g.umiditaMin.toFixed(0),
          umiditaMax: g.umiditaMax.toFixed(0),
          pioggia: g.pioggia.toFixed(1)
        })),
        {
          giorno: 'Mensile',
          tempMin: mensileRaw.tempMin.toFixed(1),
          tempMax: mensileRaw.tempMax.toFixed(1),
          tempMedia: mensileRaw.tempMedia.toFixed(1),
          ventoMax: mensileRaw.ventoMax.toFixed(1),
          pressioneMin: mensileRaw.pressioneMin.toFixed(1),
          pressioneMax: mensileRaw.pressioneMax.toFixed(1),
          umiditaMin: mensileRaw.umiditaMin.toFixed(0),
          umiditaMax: mensileRaw.umiditaMax.toFixed(0),
          pioggiaGiornalieraMax: mensileRaw.pioggiaGiornalieraMax.toFixed(1),
          pioggia: mensileRaw.pioggia.toFixed(1)
        }
      ];

      this.dataSource.data = this.arrResponse;

      // ================================================================
      // 5️⃣ ANNUALE FORMATTATO
      // ================================================================
      const dati = datiAnno;

      const ann_tempMedia = avg(dati.map(d => d.tempMedia));
      const ann_ventoMax = max(dati.map(d => d.ventoMax));
      const ann_umMin = min(dati.map(d => d.umiditaMin));
      const ann_umMax = max(dati.map(d => d.umiditaMax));
      const ann_pressMin = min(dati.map(d => d.pressioneMin));
      const ann_pressMax = max(dati.map(d => d.pressioneMax));

      let ann = this.annualStats;

      // -------------------------
      // 🔹 ANNI < 2025 (solo year.xml)
      // -------------------------
      if (this.year < 2025) {

        this.arrResponseAnno = [{
          giorno: `Anno ${this.year}`,
          tempMin: (ann?.minTemp ?? min(dati.map(d => d.tempMin))).toFixed(1),
          tempMax: (ann?.maxTemp ?? max(dati.map(d => d.tempMax))).toFixed(1),
          tempMedia: ann_tempMedia.toFixed(1),
          ventoMax: ann_ventoMax.toFixed(1),
          pressioneMin: ann_pressMin.toFixed(1),
          pressioneMax: ann_pressMax.toFixed(1),
          umiditaMin: ann_umMin.toFixed(0),
          umiditaMax: ann_umMax.toFixed(0),
          pioggiaGiornalieraMax: (ann?.maxRainDay ?? max(dati.map(d => d.pioggia))).toFixed(1),
          pioggia: (ann?.totalRain ?? sum(dati.map(d => d.pioggia))).toFixed(1)
        }];

        this.dataSourceAnno.data = this.arrResponseAnno;
        return;
      }

      // -------------------------
      // 🔹 ANNO 2025 COMBINATO
      // -------------------------
      if (this.year === 2025) {

        const xmlRain = ann?.totalRain ?? 0;   // GEN–AGO
        const xmlMaxRain = ann?.maxRainDay ?? 0;
        const xmlMinTemp = ann?.minTemp ?? 99;
        const xmlMaxTemp = ann?.maxTemp ?? -99;

        const df = dati.filter(d => d.mese >= 9);

        const dfRain = sum(df.map(d => d.pioggia));
        const dfMaxRain = max(df.map(d => d.pioggia));
        const dfMinTemp = min(df.map(d => d.tempMin));
        const dfMaxTemp = max(df.map(d => d.tempMax));

        const totalRain = xmlRain + dfRain;
        const maxRainDay = Math.max(xmlMaxRain, dfMaxRain);
        const minTemp = Math.min(xmlMinTemp, dfMinTemp);
        const maxTemp = Math.max(xmlMaxTemp, dfMaxTemp);

        this.arrResponseAnno = [{
          giorno: `Anno 2025`,
          tempMin: minTemp.toFixed(1),
          tempMax: maxTemp.toFixed(1),
          tempMedia: ann_tempMedia.toFixed(1),
          ventoMax: ann_ventoMax.toFixed(1),
          pressioneMin: ann_pressMin.toFixed(1),
          pressioneMax: ann_pressMax.toFixed(1),
          umiditaMin: ann_umMin.toFixed(0),
          umiditaMax: ann_umMax.toFixed(0),
          pioggiaGiornalieraMax: maxRainDay.toFixed(1),
          pioggia: totalRain.toFixed(1)
        }];

        this.dataSourceAnno.data = this.arrResponseAnno;
        return;
      }

      // -------------------------
      // 🔹 ANNI > 2025 (solo dayfile)
      // -------------------------
      if (this.year > 2025) {

        this.arrResponseAnno = [{
          giorno: `Anno ${this.year}`,
          tempMin: min(dati.map(d => d.tempMin)).toFixed(1),
          tempMax: max(dati.map(d => d.tempMax)).toFixed(1),
          tempMedia: ann_tempMedia.toFixed(1),
          ventoMax: ann_ventoMax.toFixed(1),
          pressioneMin: ann_pressMin.toFixed(1),
          pressioneMax: ann_pressMax.toFixed(1),
          umiditaMin: ann_umMin.toFixed(0),
          umiditaMax: ann_umMax.toFixed(0),
          pioggiaGiornalieraMax: max(dati.map(d => d.pioggia)).toFixed(1),
          pioggia: sum(dati.map(d => d.pioggia)).toFixed(1)
        }];

        this.dataSourceAnno.data = this.arrResponseAnno;
        return;
      }

    } finally {
      this.imageLoader = false;
      this.imageLoaderAnno = false;
      this.isVisible = true;
      this.isVisibleAnno = true;
      this.dataLoaded.emit(true);
    }
  }



  private async loadXmlMonthlyData(
    year: number,
    month: number
  ): Promise<DatoGiornalieroRaw[]> {

    const parser = new DOMParser();
    const result: DatoGiornalieroRaw[] = [];
    const monthStr = month.toString().padStart(2, '0');

    // filelist.json del mese
    const listUrl = `assets/storico-treo/${year}/${monthStr}/filelist.json`;

    let files: string[] = [];
    try {
      files = await this.http.get<string[]>(listUrl).toPromise();
    } catch {
      return [];
    }

    if (!files?.length) return [];

    for (const filename of files) {

      try {
        const xmlString = await this.http.get(
          `assets/storico-treo/${year}/${monthStr}/${filename}`,
          { responseType: 'text' }
        ).toPromise();

        if (!xmlString?.trim()) continue;

        const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
        const root = xmlDoc.querySelector('statistics');
        if (!root) continue;

        const day = (root.getAttribute('day') || '01').padStart(2, '0');

        // Determina il formato XML
        const isNewFormat =
          xmlDoc.querySelector('outdoor_temperature')?.hasAttribute('max');

        const val = (sel: string, attr?: string): number => {
          const el = xmlDoc.querySelector(sel);
          if (!el) return NaN;
          if (attr && el.hasAttribute(attr)) {
            return parseFloat(el.getAttribute(attr) || '');
          }
          return parseFloat(el.textContent || '');
        };

        // ===============================
        // 📌 XML NUOVO (2025)
        // ===============================
        if (isNewFormat) {
          result.push({
            giorno: day,
            mese: month,
            anno: year % 100,

            tempMin: val('outdoor_temperature', 'min'),
            tempMax: val('outdoor_temperature', 'max'),
            tempMedia: val('outdoor_temperature', 'mean'),

            ventoMax: val('wind_speed', 'max'),

            pressioneMin: val('relative_pressure', 'min'),
            pressioneMax: val('relative_pressure', 'max'),

            umiditaMin: val('outdoor_humidity', 'min'),
            umiditaMax: val('outdoor_humidity', 'max'),

            pioggia: val('total-rainfall', 'value')
          });

          continue;
        }

        // ===============================
        // 📌 XML VECCHIO (fino al 2024)
        // ===============================
        result.push({
          giorno: day,
          mese: month,
          anno: year % 100,

          tempMin: val('outdoor_temperature > min'),
          tempMax: val('outdoor_temperature > max'),
          tempMedia: (val('outdoor_temperature > min') + val('outdoor_temperature > max')) / 2,

          ventoMax: val('wind_speed > max'),

          pressioneMin: val('relative_pressure > min'),
          pressioneMax: val('relative_pressure > max'),

          umiditaMin: val('outdoor_humidity > min'),
          umiditaMax: val('outdoor_humidity > max'),

          pioggia: val('total-rainfall')
        });

      } catch {
        continue;
      }
    }

    return result;
  }

  private async loadXmlYearStats(year: number): Promise<AnnualRaw | null> {

    const url = `assets/storico-treo/${year}/${year}.xml`;

    try {
      const xmlString = await this.http.get(url, { responseType: 'text' }).toPromise();
      if (!xmlString) return null;

      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlString, 'application/xml');

      // helper per pulire valori tipo "38.5 °C"
      const clean = (s: string | null | undefined) =>
        parseFloat((s || '').replace(/[^\d.-]/g, ''));

      // valori finali
      let totalRain = 0;
      let maxRainDay = 0;
      let maxRainDayDate = '';
      let minTemp = 0;
      let minTempDate = '';
      let maxTemp = 0;
      let maxTempDate = '';

      // ============================================================
      // 📌 FORMATO PRE-2025 (vecchio)
      // riconoscibile perché usa tag names <tn-min>, <tx-max>, <total-rainfall>
      // ============================================================
      if (xml.querySelector('tn-min')) {

        totalRain = clean(xml.querySelector('total-rainfall')?.textContent);
        maxRainDay = clean(xml.querySelector('max-rainfall-day')?.textContent);
        maxRainDayDate = xml.querySelector('max-rainfall-day-date-text')?.textContent?.trim() || '';

        minTemp = clean(xml.querySelector('tn-min')?.textContent);
        minTempDate = xml.querySelector('tn-min-date-text')?.textContent?.trim() || '';

        maxTemp = clean(xml.querySelector('tx-max')?.textContent);
        maxTempDate = xml.querySelector('tx-max-date-text')?.textContent?.trim() || '';

        return {
          totalRain,
          maxRainDay,
          maxRainDayDate,
          minTemp,
          minTempDate,
          maxTemp,
          maxTempDate,
        };
      }

      // ============================================================
      // 📌 FORMATO 2025 (nuovo)
      // riconoscibile perché usa attributi tipo value=""
      // ============================================================
      if (xml.querySelector('total-rainfall[value]')) {

        const rainNode = xml.querySelector('total-rainfall');
        const maxRainNode = xml.querySelector('max-rainfall');

        const tnNode = xml.querySelector('tn');
        const txNode = xml.querySelector('tx');

        totalRain = clean(rainNode?.getAttribute('value'));
        maxRainDay = clean(maxRainNode?.getAttribute('day'));
        maxRainDayDate = maxRainNode?.getAttribute('day-date-text') || '';

        minTemp = clean(tnNode?.getAttribute('min'));
        minTempDate = tnNode?.getAttribute('min-date-text') || '';

        maxTemp = clean(txNode?.getAttribute('max'));
        maxTempDate = txNode?.getAttribute('max-date-text') || '';

        return {
          totalRain,
          maxRainDay,
          maxRainDayDate,
          minTemp,
          minTempDate,
          maxTemp,
          maxTempDate,
        };
      }

      return null;

    } catch (e) {
      console.warn('Errore lettura year.xml', e);
      return null;
    }
  }


  private parseDayfile(content: string, year: number): DatoGiornalieroRaw[] {
    const righe = content.trim().split('\n');
    const yearShort = year % 100;
    const result: DatoGiornalieroRaw[] = [];

    for (const riga of righe) {
      const c = riga.split(',');
      if (c.length < 25) continue;
      const [giorno, mese, anno] = c[0].split('/').map(Number);
      if (anno !== yearShort) continue;

      const safe = (v: string) => parseFloat(v) || 0;

      result.push({
        giorno: giorno.toString().padStart(2, '0'),
        mese,
        anno,
        tempMin: safe(c[4]),
        tempMax: safe(c[6]),
        pressioneMin: safe(c[8]),
        pressioneMax: safe(c[10]),
        pioggia: safe(c[14]),       // ← colonna giusta della pioggia
        tempMedia: safe(c[15]) || (safe(c[4]) + safe(c[6])) / 2,
        umiditaMin: safe(c[19]),
        umiditaMax: safe(c[21]),
        ventoMax: safe(c[1])
      });
    }

    return result;
  }



  //Get-ChildItem -Recurse -Directory | ForEach-Object { $xmls = Get-ChildItem $_.FullName -Filter *.xml -Name | Where-Object { $_ -match "^\d{4}_\d{2}_\d{2}\.xml$" } | Sort-Object; if ($xmls.Count -gt 0) { $jsonBody = ($xmls | ForEach-Object { '    "' + $_ + '"' }) -join ",`n"; $json = "[`n$jsonBody`n]"; $path = Join-Path $_.FullName "filelist.json"; Set-Content -Path $path -Value $json -Encoding UTF8; Write-Host "✅ Creato $path con $($xmls.Count) file XML"; } else { Write-Host "❌ Nessun file XML giornaliero in $($_.FullName)"; } }

  // 🔍 Cambio data nel datepicker
  filterData(selectedDate: Date = this.dateControl.value): void {
    if (!selectedDate) {
      return;
    }
    this.month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    this.year = selectedDate.getFullYear();
    this.loadCumulusDayFileData();
    this.precYear = this.year;
  }

  // 📆 Cambio mese con paginator
  public handlePage(e: PageEvent): void {
    if (!this.dateControl.value) {
      return;
    }
    let currentMonth = this.dateControl.value.getMonth();
    let currentYear = this.year;

    if (e.pageIndex > e.previousPageIndex) {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
    }
    if (e.pageIndex < e.previousPageIndex) {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
    }

    this.year = currentYear;
    this.month = (currentMonth + 1).toString().padStart(2, '0');
    this.currentPage = currentMonth;

    const selectedDate = new Date(currentYear, currentMonth, 1);
    this.dateControl.setValue(selectedDate, {emitEvent: false});

    console.log(`📅 Cambio mese → ${this.month}/${this.year}`);
    this.imageLoader = this.imageLoaderAnno = true;
    this.isVisible = this.isVisibleAnno = false;

    setTimeout(() => this.loadCumulusDayFileData(), 100);
  }

  // 📆 Cambio anno nel paginator annuale
  public handlePageAnno(e: PageEvent): void {
    const MIN_YEAR = 2013, MAX_YEAR = 2050;
    const goingForward = e.pageIndex > this.currentPageAnno;
    const goingBackward = e.pageIndex < this.currentPageAnno;

    if (goingForward && this.year < MAX_YEAR) {
      this.year++;
    } else if (goingBackward && this.year > MIN_YEAR) {
      this.year--;
    } else {
      return;
    }

    this.currentPageAnno = e.pageIndex;
    const selectedDate = new Date(this.year, this.dateControl.value.getMonth(), 1);
    this.dateControl.setValue(selectedDate, {emitEvent: false});
    console.log(`📆 Cambio anno → ${this.year}`);
    this.imageLoader = this.imageLoaderAnno = true;
    this.isVisible = this.isVisibleAnno = false;
    setTimeout(() => this.loadCumulusDayFileData(), 100);
  }


  // Funzione per calcolare il colore in base al valore
  getCellColor(value: number): string {
    const minValue = -20.0;  // Valore minimo (blu)
    const maxValue = 50.0; // Valore massimo (rosso scuro)
    if (value <= 5) {
      // Transizione da blu a verdino (0°C)
      const normalizedValue = (value - minValue) / (5 - minValue); // Normalizza tra -20 e 0
      const blue = Math.floor(255 * (1 - normalizedValue) * 3);  // Blu scuro a verdino
      const green = Math.floor(255 * normalizedValue);       // Aumenta il verde verso 0°C
      return 'rgb(0, ' + green.toString() + ', ' + blue.toString() + ')';

    } else {
      // Transizione da verdino a rosso (0°C a 40°C)
      const normalizedValue = (value - 0) / (maxValue - 0); // Normalizza tra 0 e 40
      const red = Math.floor(255 * normalizedValue);        // Aumenta il rosso verso 40°C
      const green = Math.floor(255 * (1 - normalizedValue) - 20); // Diminuisce il verde
      return 'rgb(' + red.toString() + ', ' + green.toString() + ', 0)';
    }
  }

  // Funzione per calcolare il colore in base al valore
  // Funzione per calcolare il colore in base al valore
  getPioggiaColor(value: number): string {
    const minValue = 0;   // Valore minimo (celestino)
    const midValue = 0.5; // Valore medio (verdino)
    const maxValue = 150; // Valore massimo (rosso scuro)

    if (value <= midValue) {
      // Transizione da celestino a verdino (0 a 0.5)
      const normalizedValue = value / midValue; // Normalizza tra 0 e 0.5
      const red = Math.floor(173 * (1 - normalizedValue)); // Diminuisce il blu (celestino -> verdino)
      const green = Math.floor(216 * normalizedValue);     // Aumenta il verde (celestino -> verdino)
      return 'rgb(' + red.toString() + ', 230, 230)';
    } else {
      // Transizione da verdino a rosso scuro (0.5 a 200)
      const normalizedValue = (value - midValue) / (maxValue - midValue); // Normalizza tra 0.5 e 200
      const red = Math.floor(139 * normalizedValue + 0 * (1 - normalizedValue));  // Aumenta il rosso (verdino -> rosso scuro)
      const green = Math.floor(255 * (1 - normalizedValue)); // Diminuisce il verde (verdino -> rosso scuro)
      return 'rgb(' + red.toString() + ', ' + green.toString() + ', 180)';
    }
  }

  // Funzione per calcolare il colore in base al valore
  getUmiditaColor(value: number): string {
    const minValue = 0;   // Valore minimo (celestino)
    const midValue = 0.5; // Valore medio (verdino)
    const maxValue = 100; // Valore massimo (rosso scuro)

    if (value <= midValue) {
      // Transizione da celestino a verdino (0 a 0.5)
      const normalizedValue = value / midValue; // Normalizza tra 0 e 0.5
      const red = Math.floor(173 * (1 - normalizedValue)); // Diminuisce il blu (celestino -> verdino)
      const green = Math.floor(216 * normalizedValue);     // Aumenta il verde (celestino -> verdino)
      return 'rgb(' + red.toString() + ', 230, 230)';
    } else {
      // Transizione da verdino a rosso scuro (0.5 a 200)
      const normalizedValue = (value - midValue) / (maxValue - midValue); // Normalizza tra 0.5 e 200
      const red = Math.floor(139 * normalizedValue + 0 * (1 - normalizedValue));  // Aumenta il rosso (verdino -> rosso scuro)
      const green = Math.floor(255 * (1 - normalizedValue)); // Diminuisce il verde (verdino -> rosso scuro)
      return 'rgb(' + red.toString() + ', ' + green.toString() + ', 127)';
    }
  }

  // Funzione per calcolare il colore in base al valore (transizione bianco -> grigio -> rosso)
  getVentoColor(value: number): string {
    const minValue = 0;    // Valore minimo (bianco)
    const midValue = 70;   // Valore intermedio (inizio transizione verso rosso)
    const maxValue = 150;  // Valore massimo (rosso)

    if (value <= minValue) {
      return 'rgb(255, 255, 255)'; // Bianco
    } else if (value >= maxValue) {
      return 'rgb(255, 0, 0)'; // Rosso
    } else if (value <= midValue) {
      // Transizione da bianco a grigio
      const normalizedValue = (value - minValue) / (midValue - minValue);
      const gray = Math.floor(255 * (1 - normalizedValue) + 80); // Dal bianco (255) al grigio (0)

      return `rgb(${gray}, ${gray}, ${gray})`; // Colore da bianco a grigio
    } else {
      // Transizione da grigio a rosso
      const normalizedValue = (value - midValue) / (maxValue - midValue);
      const red = Math.floor(255 * normalizedValue);  // Aumenta il rosso da 0 a 255
      const gray = Math.floor(255 * (1 - normalizedValue) - 110); // Diminuisce grigio da 255 a 0

      return `rgb(255, ${red}, ${gray})`; // Da grigio a rosso
    }
  }

  // Funzione per calcolare il colore in base al valore (transizione bianco -> grigio -> rosso)
  getPressioneColor(value: number): string {
    const minValue = 1040;   // Valore massimo (celestino)
    const midValue = 1010; // Valore medio (verdino)
    const maxValue = 980; // Valore minimo (rosso scuro)

    if (value <= midValue) {
      // Transizione da celestino a verdino (0 a 0.5)
      const normalizedValue = value / midValue; // Normalizza tra 0 e 0.5
      const red = Math.floor(173 * (1 - normalizedValue)); // Diminuisce il blu (celestino -> verdino)
      const green = Math.floor(216 * normalizedValue);     // Aumenta il verde (celestino -> verdino)
      return 'rgb(' + red.toString() + ', 230, 230)';
    } else {
      // Transizione da verdino a rosso scuro (0.5 a 200)
      const normalizedValue = (value - midValue) / (maxValue - midValue); // Normalizza tra 0.5 e 200
      const red = Math.floor(139 * normalizedValue + 0 * (1 - normalizedValue));  // Aumenta il rosso (verdino -> rosso scuro)
      const green = Math.floor(255 * (1 - normalizedValue)); // Diminuisce il verde (verdino -> rosso scuro)
      return 'rgb(' + red.toString() + ', ' + green.toString() + ', 127)';
    }
  }

  // Funzione per calcolare la Pressione al Livello del Mare (SLP)
  calculateSeaLevelPressure(stationPressure: number, elevationInMeters: number): number {
    const tempRatio = 288 / (288 - 0.0065 * elevationInMeters);
    const seaLevelPressure = stationPressure * Math.pow(tempRatio, 5.2561);
    // -5 inserito ad occhio confronto alla mia
    return seaLevelPressure - 5;
  }

  // Funzione per ottenere il nome del mese da un numero
  getMonthName(monthNumber: string): string {
    // Converti il numero di mese da stringa a numero (esempio "08" -> 7)
    const monthIndex = parseInt(monthNumber, 10) - 1;

    // Verifica se il mese è valido
    if (monthIndex >= 0 && monthIndex < 12) {
      return this.months[monthIndex];
    } else {
      return 'Mese non valido';
    }
  }

  // Quando viene selezionato un anno
  chosenYearHandler(normalizedYear: Date, datepicker: any) {
    const ctrlValue = this.dateControl.value;
    ctrlValue.setFullYear(normalizedYear.getFullYear());
    this.dateControl.setValue(ctrlValue);
  }

  // Quando viene selezionato un anno
  chosenYearHandlerAnnuale(normalizedYear: Date, datepicker: any) {
    const ctrlValue = this.dateControl.value;
    ctrlValue.setFullYear(normalizedYear.getFullYear());
    this.dateControl.setValue(ctrlValue);
  }

  // Quando viene selezionato un mese
  chosenMonthHandler(normalizedMonth: Date, datepicker: any) {
    const ctrlValue = this.dateControl.value;
    ctrlValue.setMonth(normalizedMonth.getMonth());
    this.dateControl.setValue(ctrlValue);
    datepicker.close();  // Chiude il selettore
  }
}
