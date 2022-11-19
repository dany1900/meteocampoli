import {AfterViewInit, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {TerremotiResponse} from '../terremoti.interface';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {formatDate} from '@angular/common';

@Component({
  selector: 'terremoti-mondo',
  templateUrl: './terremoti-mondo.component.html',
  styleUrls: ['./terremoti-mondo.component.css']
})
export class TerremotiMondoComponent implements OnInit, AfterViewInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  arrResponse: TerremotiResponse[] = [];
  displayedColumns: string[] = ['dataOra', 'profondita', 'zona', 'magnitudo'];
  dataSource = new MatTableDataSource<TerremotiResponse>(this.arrResponse);
  isVisible = false;
  imageLoader = true;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.dataSource.sort) {
      this.dataSource.sort = sort;
    }
  }
  public pageSize = 40;
  public currentPage = 0;
  public totalSize = 0;
  pageEvent: PageEvent;

  constructor(private seo: SEOService, protected router: Router, public renderer: Renderer2, public utilityService: UtiliyService, private http: HttpClient) {
    this.title = 'Terremoti Mondo - Meteo Campoli';
    this.description = 'Informazioni generali sui terremoti. Mappa pericolosità sismica degli ultimi 50 anni nel mondo.';
    this.keywords = 'terremoti meteo campoli, lista terremoti, ultimi terremoti campoli, terremoti campoli appennino, ultimo terremoto campoli, lista terremoti campoli appennino,elenco terremoti in italia, lista ultimi terremoti,lista terremoti ingv aggiornata,elenco sismico italiano,iside terremoti,iside lista terremoti,elenco scosse terremoto,terremoti elenco,ingv lista terremoti iside,meteo terremoti altervista,istituto nazionale geofisica e vulcanologia lista terremoti,lista terremoti italia,elenco terremoti italia,elenco terremoti,lista terremoti qualsiasi magnitudo,bollettino terremoti';
    this.ogUrl = 'www.meteocampoli.altervista.org/terremoti/mondo';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
    this.tabellaTerremoti();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.utilityService.scrollToSpecifyPosition();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  tabellaTerremoti() {
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    const d = new Date(today);
    d.setDate(d.getDate() - 60); // subtract 60 days
    const dateMinus4Day = d.toISOString().split('T')[0];
    const url = 'https://webservices.ingv.it/fdsnws/event/1/query';
    const headers = new HttpHeaders();
    headers.set('content-type', 'text/plain; charset=utf-8');
    let queryParams = new HttpParams();
    queryParams = queryParams.append('starttime', dateMinus4Day);
    queryParams = queryParams.append('minmag', '5.0');
    queryParams = queryParams.append('orderby', 'time');
    queryParams = queryParams.append('format', 'text');
    queryParams = queryParams.append('includeallorigins', false);
    queryParams = queryParams.append('includeallmagnitudes', false);
    queryParams = queryParams.append('includeallstationsmagnitudes', false);
    queryParams = queryParams.append('includearrivals', false);
    return this.http.get(url, {headers: headers, params: queryParams, responseType: 'text'}).subscribe(data => {
      const eachLine = data?.toString().split('\n');
      let count = 0;
      eachLine?.forEach((line: string) => {
        if (count !== 0 && line) {
          const lineSplit = line.split('|');
          const date = new Date(lineSplit[1]);
          const dateFormatted = date.toLocaleString().replace(',', ' ');
          const terremoti: TerremotiResponse = {
            dataOra: dateFormatted,
            magnitudo: lineSplit[10],
            profondita: lineSplit[4],
            zona: lineSplit[12],
          };
          this.arrResponse.push(terremoti);
        }
        count++;
      });
      if (count === eachLine.length) {
        this.dataSource = new MatTableDataSource<TerremotiResponse>(this.arrResponse);
        this.dataSource.paginator = this.paginator;
        this.totalSize = this.arrResponse.length;
        this.iterator();
        this.imageLoader = false;
        this.isVisible = true;
      }
    }, () =>  this.isVisible = true);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.arrResponse.slice(start, end);
    this.dataSource = new MatTableDataSource<TerremotiResponse>(part);
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
