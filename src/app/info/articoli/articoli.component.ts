import {Component, Input} from '@angular/core';

@Component({
  selector: 'articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent {

  @Input() titleArticle: string;
  @Input() descArticle: string;
  @Input() routerArticle: string;
  @Input() srcImage: string;
  @Input() class = 'img-article';
  @Input() zoom: string;
  imageLoader = true;

  constructor() {
  }
}
