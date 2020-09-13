import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-tutorials',
  templateUrl: './angular-tutorials.component.html',
  styleUrls: ['./angular-tutorials.component.css']
})
export class AngularTutorialsComponent implements OnInit {

  angList = [
    {
      title: 'Basic website with Angular',
      body: 'Intro to Angular. Build a basic website series.',
      guide: "/angular-website",
      video: [
        { info: "https://www.youtube.com/embed/l10kYBbBbFM" },
        { info: "https://www.youtube.com/embed/xozXG8TMxGs" }
      ]
    },
    {
      title: '.Net Core with Angular',
      body: 'Create a webapi using .Net Core and Angular',
      guide: "",
      video: [
        { info: "https://www.youtube.com/embed/dW-RXpF4w9Q" }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.scrollToTop();
  }

  public scrollToTop() {
    window.scroll(0, 0);
  }

}
