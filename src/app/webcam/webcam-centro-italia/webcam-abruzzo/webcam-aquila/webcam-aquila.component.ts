import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'webcam-aquila',
  templateUrl: './webcam-aquila.component.html',
  styleUrls: ['./webcam-aquila.component.css']
})
export class WebcamAquilaComponent implements OnInit {

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
