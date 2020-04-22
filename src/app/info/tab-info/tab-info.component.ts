import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'tab-info',
  templateUrl: './tab-info.component.html',
  styleUrls: ['./tab-info.component.css']
})
export class TabInfoComponent implements OnInit {

  id: number;

  constructor(private myElement: ElementRef) {
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('mat-tab-group');
    el.scrollIntoView();
  }

}
