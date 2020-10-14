import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/shared/blog.service';
import { Post } from '../post';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  public post: Post;

  constructor(private route: ActivatedRoute,
              private bService: BlogService) { }

  ngOnInit(): void {
    this.getPost();
  }

  public getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.bService.getData(id).subscribe(data => this.post = data);
  }

}
