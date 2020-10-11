import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-app',
  templateUrl: './blog-app.component.html',
  styleUrls: ['./blog-app.component.css']
})
export class BlogAppComponent implements OnInit {
  public popup: boolean = true;
  public blogs = [
    {
      title: 'From fat to fit',
      info: 'My personal journey from being overweight with chronic back problems to being fit and pain free.',
      author: 'Brent Owen',
      image: '../../assets/workout_1.jpg',
      body: 
      `<h2>Fat to fit</h2>
      <p>My personal journey</p>
      <p>
      A few years ago I was one of the millions of people who had chronic back pain and while I didn't think I was that overweight soon realized I was. My back would go out nearly
      every few weeks which would put me done for a few days each time.
      </p>
      
      `
    },

  ];

  constructor() { }

  ngOnInit(): void {
  }

  public closePopup() {
    this.popup = !this.popup;
  }

}
