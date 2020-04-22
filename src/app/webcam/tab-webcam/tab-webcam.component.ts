import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'tab-webcam',
  templateUrl: './tab-webcam.component.html',
  styleUrls: ['./tab-webcam.component.css']
})
export class TabWebcamComponent implements OnInit {


  constructor(private myElement: ElementRef) {
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('mat-tab-group');
    el.scrollIntoView();
  }
}
