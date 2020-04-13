import {Component, ElementRef, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'tab-articoli',
  templateUrl: './tab-articoli.component.html',
  styleUrls: ['./tab-articoli.component.css']
})
export class TabArticoliComponent implements OnInit, OnChanges {

  id: number;

  constructor(private myElement: ElementRef) {
  }

  ngOnInit(): void {
    const el = this.myElement.nativeElement.querySelector('mat-tab-group');
    el.scrollIntoView({behavior: 'smooth'});
  }

  ngOnChanges() {
  }

}
