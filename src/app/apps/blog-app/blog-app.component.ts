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
      title: 'Test',
      info: 'Test blog info sentence.',
      author: 'Brent Owen',
      image: '../../assets/upper_image.jpg',
      body: '<h2>1 This is the heading</h2><img src="../../assets/upper_image.jpg"><p>This is the main paragraph for the blog post.</p>'
    },
    {
      title: 'Test',
      info: 'Test blog info sentence.',
      author: 'Brent Owen',
      image: '../../assets/upper_image.jpg',
      body: '<h2>2 This is the heading</h2><img src="../../assets/upper_image.jpg"><p>This is the main paragraph for the blog post.</p>'
    },
    {
      title: 'Test',
      info: 'Test blog info sentence.',
      author: 'Brent Owen',
      image: '../../assets/upper_image.jpg',
      body: '<h2>3 This is the heading</h2><img src="../../assets/upper_image.jpg"><p>This is the main paragraph for the blog post.</p>'
    },
    {
      title: 'Test',
      info: 'Test blog info sentence.',
      author: 'Brent Owen',
      image: '../../assets/upper_image.jpg',
      body: '<h2>4 This is the heading</h2><img src="../../assets/upper_image.jpg"><p>This is the main paragraph for the blog post.</p>'
    },
    {
      title: 'Test',
      info: 'Test blog info sentence.',
      author: 'Brent Owen',
      image: '../../assets/upper_image.jpg',
      body: '<h2>5 This is the heading</h2><img src="../../assets/upper_image.jpg"><p>This is the main paragraph for the blog post.</p>'
    },
    {
      title: 'Test',
      info: 'Test blog info sentence.',
      author: 'Brent Owen',
      image: '../../assets/upper_image.jpg',
      body: '<h2>6 This is the heading</h2><img src="../../assets/upper_image.jpg"><p>This is the main paragraph for the blog post.</p>'
    },
    {
      title: 'Test',
      info: 'Test blog info sentence.',
      author: 'Brent Owen',
      image: '../../assets/upper_image.jpg',
      body: '<h2>7 This is the heading</h2><img src="../../assets/upper_image.jpg"><p>This is the main paragraph for the blog post.</p>'
    },
    {
      title: 'Test',
      info: 'Test blog info sentence.',
      author: 'Brent Owen',
      image: '../../assets/upper_image.jpg',
      body: '<h2>8 This is the heading</h2><img src="../../assets/upper_image.jpg"><p>This is the main paragraph for the blog post.</p>'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public closePopup() {
    this.popup = !this.popup;
  }

}
