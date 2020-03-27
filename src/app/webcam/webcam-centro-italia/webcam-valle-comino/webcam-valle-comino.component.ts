import {Component, OnInit} from '@angular/core';
import {WebcamComponent} from '../../webcam.component';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'webcam-valle-comino',
  templateUrl: './webcam-valle-comino.component.html',
  styleUrls: ['./webcam-valle-comino.component.css']
})
export class WebcamValleCominoComponent extends WebcamComponent implements OnInit {

  constructor(private meta: Meta, private titleService: Title) {
    super();
    titleService.setTitle('Previsioni Meteo - Monitoraggio Indici Climatici - Meteo Campoli');
  }

  ngOnInit() {
  }

}
