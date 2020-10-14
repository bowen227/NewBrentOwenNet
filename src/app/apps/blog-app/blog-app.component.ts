import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogService } from '../../shared/blog.service';
import { AuthService } from '../../shared/auth.service';
import { Post } from './post';

@Component({
  selector: 'app-blog-app',
  templateUrl: './blog-app.component.html',
  styleUrls: ['./blog-app.component.css']
})
export class BlogAppComponent implements OnInit {
  posts: Observable<Post[]>;
  user;

  constructor(public bService: BlogService, public auth: AuthService) { }

  ngOnInit(): void {
    this.posts = this.bService.getPosts();

    this.user = this.auth.auth.authState.subscribe(u => {
      console.log(u);
    })
  }

}
