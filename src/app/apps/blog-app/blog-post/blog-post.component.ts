import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  public post;
  public title;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPost();

  }

  public getPost() {
    this.post = this.route.snapshot.paramMap.get('body');
    this.title = this.route.snapshot.paramMap.get('title');
  }

}
