import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'webcam-perugia',
  templateUrl: './webcam-perugia.component.html',
  styleUrls: ['./webcam-perugia.component.css']
})
export class WebcamPerugiaComponent implements OnInit {

  imageLoader = true;

  constructor(private myElement: ElementRef) {
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('.title-micro-section');
    if (el.scrollIntoViewIfNeeded) {
      el.scrollIntoViewIfNeeded();
    } else {
      el.scrollIntoView();
    }
  }

}
