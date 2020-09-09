import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'webcam-isernia',
  templateUrl: './webcam-isernia.component.html',
  styleUrls: ['./webcam-isernia.component.css']
})
export class WebcamIserniaComponent implements OnInit {

  imageLoader = true;

  constructor(private myElement: ElementRef) {
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('.title-micro-section');
    el.scrollIntoView();
  }

}
