import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogService } from '../../shared/blog.service';
import { Post } from './post';

@Component({
  selector: 'app-blog-app',
  templateUrl: './blog-app.component.html',
  styleUrls: ['./blog-app.component.css']
})
export class BlogAppComponent implements OnInit {
  posts: Observable<Post[]>;
  public popup: boolean = true;

  constructor(public bService: BlogService) { }

  ngOnInit(): void {
    this.posts = this.bService.getPosts();
  }

  public closePopup() {
    this.popup = !this.popup;
  }

}
