// src/app.component.ts
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  ngAfterViewChecked() {
    window.scrollTo(500, 500);
  }

  ngOnInit() {

  }

}

