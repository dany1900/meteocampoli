import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'webcam-ascoli',
  templateUrl: './webcam-ascoli.component.html',
  styleUrls: ['./webcam-ascoli.component.css']
})
export class WebcamAscoliComponent implements OnInit {

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
