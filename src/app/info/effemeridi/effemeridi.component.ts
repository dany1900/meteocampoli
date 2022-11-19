import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {formatDate} from '@angular/common';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {EffemeridiResponse} from './effemeridi.interface';

@Component({
  selector: 'effemeridi',
  templateUrl: './effemeridi.component.html',
  styleUrls: ['./effemeridi.component.css']
})
export class EffemeridiComponent implements OnInit, AfterViewInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  imageLoader = true;
  arrResponse: EffemeridiResponse[] = [];
  displayedColumns: string[] = ['giorno', 'durataGiorno', 'alba', 'tramonto', 'inizioCrepuscolo', 'fineCrepuscolo'];
  giorno: string;
  dataSource = new MatTableDataSource<EffemeridiResponse>(this.arrResponse);
  isVisible = false;

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.dataSource.sort) {
      this.dataSource.sort = sort;
    }
  }

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService, private http: HttpClient) {
    this.title = 'Orari Alba Tramonto Campoli Appennino - Meteo Campoli';
    this.description = 'Orari di alba e tramonto dettagliati di Campoli Appennino. Informazioni relative alla durata dei giorni per ogni mese, informazioni sulla posizione geografica con coordinate';
    this.keywords = 'effemeridi campoli, orario alba campoli appennino';
    this.ogUrl = 'www.meteocampoli.altervista.org/info/effemeridi';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
    this.tabellaEffemeridi();
  }

  ngOnInit(): void {
    this.utilityService.scrollToSpecifyPosition();
  }

  ngAfterViewInit() {
  }

  tabellaEffemeridi() {
    const url = 'https://api.sunrise-sunset.org/json?lat=41.4412&lng=-13.41422';
    const headers = new HttpHeaders();
    headers.set('content-type', 'application/json; charset=utf-8');
    let count = 0;
    let countFinished = 0;
    const maxCount = 5;
    for (count; count < maxCount; count++) {
      const d = new Date();
      d.setDate(d.getDate() + count); // subtract 1 days
      const date = formatDate(d, 'yyyy-MM-dd', 'en-US');

      let queryParams = new HttpParams();
      queryParams = queryParams.append('date', date);

      this.http.get(url, {headers: headers, params: queryParams}).subscribe((data: any) => {
        const effemeridi: EffemeridiResponse = {
          giorno: formatDate(d, 'dd-MM-yyyy', 'en-US'),
          giornoDate: d,
          sunset: data.results.sunset,
          sunrise: data.results.sunrise,
          dayLength: data.results.day_length,
          civilTwilightBegin: data.results.civil_twilight_begin,
          civilTwilightEnd: data.results.civil_twilight_end
        };
        this.arrResponse.push(effemeridi);
        countFinished++;
        if (countFinished === maxCount) {
            this.arrResponse.sort((a: EffemeridiResponse, b: EffemeridiResponse) => {
              return a.giornoDate.getTime() - b.giornoDate.getTime();
            });
            this.isVisible = true;
            this.imageLoader = false;
        }
      }, () => {
        this.isVisible = true;
        this.imageLoader = false;
      }).add(() => {
      });
    }
  }

}
