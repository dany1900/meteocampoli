import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'webcam-pistoia',
  templateUrl: './webcam-pistoia.component.html',
  styleUrls: ['./webcam-pistoia.component.css']
})
export class WebcamPistoiaComponent implements OnInit {

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
