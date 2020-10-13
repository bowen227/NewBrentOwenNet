import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

export interface POST {
  id: string,
  image: string,
  title: string,
  body: string,
  date: string,
  author: string
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(public afAuth: AngularFireAuth) { }

  signIn() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signOut() {
    this.afAuth.signOut();
  }
}
