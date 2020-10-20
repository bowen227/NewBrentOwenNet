import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { BlogService } from 'src/app/shared/blog.service';
import { Post } from '../post';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  public post: Post;
  public user;
  public userId;
  public edit: boolean = false;
  public newComment: boolean = false;
  public comment: string;
  public likes;
  public liked: boolean;

  constructor(private route: ActivatedRoute,
              private bService: BlogService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.auth.authState.subscribe(u => {
      if (u !== null) {
        this.userId = u.uid
        this.user = u.displayName || u.email
      } else {
        this.user = null
      }
    });

    this.getPost();
  }

  public getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.bService.getData(id).subscribe(data => {
      this.post = data
      for (const key in data.likes) {
        if (Object.prototype.hasOwnProperty.call(data.likes, key)) {
          const element = data.likes[key];
          this.liked = (element === this.userId) ? true : false;
        }
      }
    });
  }

  public editPost() {
    const id = this.route.snapshot.paramMap.get('id');
    const data = {
      title: this.post.title,
      body: this.post.body
    }
    this.bService.updatePost(id, data);
    this.edit = !this.edit;
  }

  public addLike() {
    const id = this.route.snapshot.paramMap.get('id');
    this.bService.likePost(id, this.userId);
  }

  public removeLike() {
    const id = this.route.snapshot.paramMap.get('id');
    this.bService.removeLike(id, this.userId);
  }

  public addComment() {
    this.newComment = !this.newComment
  }

  public saveComment() {
    const id = this.route.snapshot.paramMap.get('id');
    const data = {
      date: new Date(),
      text: this.comment,
      user: this.user
    }
    this.bService.addComment(id, data)
    this.addComment();
  }
}
