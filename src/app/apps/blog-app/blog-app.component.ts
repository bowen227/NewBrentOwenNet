import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogService } from '../../shared/blog.service';
import { AuthService } from '../../shared/auth.service';
import { Post } from './post';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-app',
  templateUrl: './blog-app.component.html',
  styleUrls: ['./blog-app.component.css']
})
export class BlogAppComponent implements OnInit {
  posts: Observable<Post[]>;
  user;

  constructor(public bService: BlogService,
              public auth: AuthService,
              private toast: ToastrService,
              ) { }

  ngOnInit(): void {
    this.posts = this.bService.getPosts();

    this.auth.auth.authState.subscribe(u => {
      if (u !== null) {
        this.user = u.uid
      } else {
        this.user = null
      }
    });
  }

  public deletePost(id: string) {
    this.bService.deletePost(id);
    this.toast.success("Post Deleted");    
  }
}
