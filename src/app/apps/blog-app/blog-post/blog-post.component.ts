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
    this.userId = id;
    return this.bService.getData(id).subscribe(data => this.post = data);
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
    this.bService.updateLike(id);
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
