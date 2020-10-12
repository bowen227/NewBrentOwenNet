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
      My name is Brent Owen and it wasn't that long ago I was 70 pounds heabier and a sufferer of chronic back pain. My back would go out every few weeks doing super hard task
      like picking up a dropped piece of paper. Ok, really simple task. I'd be down for a few days and finally push through with the help of muscle relaxers to get back to everyday
      things. I went to lots fo doctors, physical therapist and had more than enought shots in my back.
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
