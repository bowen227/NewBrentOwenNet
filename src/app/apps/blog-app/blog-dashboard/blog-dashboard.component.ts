import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BlogService } from 'src/app/shared/blog.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { timeout, timeoutWith } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth.service';
import { map } from 'rxjs/operators';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent implements OnInit {
  title: string;
  image: string = null;
  bodyForm: FormGroup;
  // body: string;
  userId;
  loadingImage: boolean = false;

  public uploadPerc: Observable<number>;
  public dloadURL: Observable<string>;

  constructor(private bService: BlogService,
              private toast: ToastrService,
              private storage: AngularFireStorage,
              private authService: AuthService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.authService.auth.authState.subscribe(u => this.userId = u.uid);
    this.initBodyForm();
  }

  // INITIALIZE BODYFORM
  public initBodyForm() {
    return this.bodyForm = this.fb.group({
      para: this.fb.array([
        this.initBody()
      ])
    })
  }

  // INITIALIZE BODY
  public initBody() {
    return this.fb.group({ body: ''})
  }

  // ADD NEW PARAGRAPH TO PARAGRAPH ARRAY
  public addParagraph() {
    let control = <FormArray>this.bodyForm.controls['para']
    control.push(this.initBody())
  }

  // GET THE PARAGRAPH ARRAY
  get body() {
    return this.bodyForm.get('para') as FormArray;
  }

  public createNewPost() {
    const body = this.bodyForm.get('para').value
    let bodyArray = []
    for (const key in body) {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        const element = body[key];
        bodyArray.push(element['body'])
      }
    }
    const data = {
      title: this.title,
      image: this.image,
      body: bodyArray,
      published: new Date(),
      author: this.bService.authState.displayName || this.bService.authState.email,
      authorId: this.userId,
      likes: 0,
      comments: []
    }
    console.log(data)
    this.bService.createPost(data)
    this.title = '';
    this.bodyForm.reset()
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

      task.snapshotChanges().subscribe(() => {
        this.dloadURL = this.storage.ref(path).getDownloadURL();
        this.dloadURL.subscribe(url => this.image = url);
      })
    }
  }

}
