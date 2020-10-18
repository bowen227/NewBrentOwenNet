import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BlogService } from 'src/app/shared/blog.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { timeout, timeoutWith } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent implements OnInit {
  title: string;
  image: string = null;
  body: string;
  userId;

  public uploadPerc: Observable<number>;
  public dloadURL: Observable<string>;

  constructor(private bService: BlogService,
              private toast: ToastrService,
              private storage: AngularFireStorage,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.auth.authState.subscribe(u => this.userId = u.uid);
  }

  public createNewPost() {
    const data = {
      title: this.title,
      image: this.image,
      body: this.body,
      published: new Date(),
      author: this.bService.authState.displayName || this.bService.authState.email,
      authorId: this.userId
    }
    this.bService.createPost(data)
    this.title = '';
    this.body = '';
    this.image = null;
    this.toast.success("Post created!!");
  }

  public upload(event) {
    const file = event.target.files[0];
    const path = `posts/${file.name}`
    if (file.type.split('/')[0] !== 'image') {
      this.image = null;
      return this.toast.warning("Can only upload image files...");
    } else {
      const task = this.storage.upload(path, file);
      this.uploadPerc = task.percentageChanges();
      setTimeout(() => {
        this.dloadURL = this.storage.ref(path).getDownloadURL();
        this.dloadURL.subscribe(url => this.image = url);
      }, 2000);
    }
  }

}
