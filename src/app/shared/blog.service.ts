import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Post } from '../apps/blog-app/post';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  postCollection: AngularFirestoreCollection<Post>
  post: AngularFirestoreDocument<Post>;
  authState: any = null;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) { 
    this.postCollection = this.afs.collection('posts', ref =>
    ref.orderBy('published', 'desc'));
    
    this.afAuth.authState.subscribe(data => this.authState = data);
  }

  get authenticated(): boolean {
    return this.authState !== null
  }

  get userId(): string {
    return this.authenticated ? this.authState.uid : null;
  }

  signIn() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signOut() {
    this.afAuth.signOut();
  }

  public getPosts() {
    return this.postCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data }
      });
    }));
  }

  public getData(id: string) {
    this.post = this.afs.doc<Post>(`posts/${id}`);
    return this.post.valueChanges();
  }

  public createPost(data) {
    this.postCollection.add(data);
  }

  public getPost(id: string) {
    return this.afs.doc<Post>(`posts/${id}`)
  }

  public deletePost(id: string) {
    return this.getPost(id).delete();
  }

  public updatePost(id: string, data) {
    return this.getPost(id).update(data);
  }
}
