import {Component, Input, OnInit, Renderer2} from '@angular/core';


@Component({
  selector: 'satellite',
  templateUrl: './satellite.component.html',
  styleUrls: ['./satellite.component.css']

})
export class SatelliteComponent implements OnInit {

  @Input() titleImgRadar: string;
  @Input() srcImage: string;
  @Input() infoAlt: string;
  @Input() class = 'radar-test';
  @Input() zoom: string;
  imageLoader = true;

  constructor(public renderer: Renderer2) {
  }

  ngOnInit() {
  }

  errorHandler() {
    this.srcImage = './assets/img/immagine-indisponibile.png';
  }

  toggleClass(event: any, classe: string) {
    const hasClass = event.target.classList.contains(classe);
    if (hasClass) {
      this.renderer.removeClass(event.target, classe);
    } else {
      this.renderer.addClass(event.target, classe);
    }
  }

  timeout() {
    setTimeout(() => {
      console.log('Test');
      this.timeout();
    }, 1000 / 60);
  }

}
