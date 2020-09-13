import { Component, OnInit } from '@angular/core';
import { CovidService } from '../shared/covid.service';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {
  

  constructor() { }

  ngOnInit(): void {
    this.scrollToTop();
  }

  public scrollToTop() {
    window.scroll(0, 0);
  }

  

}
