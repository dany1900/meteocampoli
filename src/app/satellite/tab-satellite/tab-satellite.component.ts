import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'tab-satellite',
  templateUrl: './tab-satellite.component.html',
  styleUrls: ['./tab-satellite.component.css']
})
export class TabSatelliteComponent implements OnInit {

  id: number;

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }
}


