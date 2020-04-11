import {Component, ElementRef, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'inquinamento-rimedi',
  templateUrl: './inquinamento-rimedi.component.html',
  styleUrls: ['./inquinamento-rimedi.component.css']
})
export class InquinamentoRimediComponent implements OnInit, OnChanges {


  constructor(private myElement: ElementRef, protected router: Router) {
  }

  ngOnInit(): void {
    const el = this.myElement.nativeElement.querySelector('.info-text');
    el.scrollIntoView({behavior: 'smooth'});
  }

  ngOnChanges() {
  }

  indietro(): void {
    this.router.navigate([this.router.url.slice(0, this.router.url.lastIndexOf('/'))]);
  }


}
