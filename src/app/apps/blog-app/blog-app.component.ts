import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-app',
  templateUrl: './blog-app.component.html',
  styleUrls: ['./blog-app.component.css']
})
export class BlogAppComponent implements OnInit {
  public popup: boolean = true;
  public blogs = [
    {title: 'Test', info: 'Test blog info sentence.', author: 'Brent Owen', image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fblog.hubspot.com%2Fhubfs%2Fhow%2520to%2520write%2520a%2520blog%2520post-2.jpg&imgrefurl=https%3A%2F%2Fblog.hubspot.com%2F&tbnid=gLf5IZX1JlvLOM&vet=12ahUKEwjPr7f4qa3sAhVP6VMKHfE-AFkQMygAegUIARDNAQ..i&docid=nxmcBnhaYYobzM&w=598&h=398&q=blog%20images&ved=2ahUKEwjPr7f4qa3sAhVP6VMKHfE-AFkQMygAegUIARDNAQ'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public closePopup() {
    this.popup = !this.popup;
  }

}
