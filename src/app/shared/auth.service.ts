import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // public authState: any = null;
  public user: any = null;

  constructor(public auth: AngularFireAuth) { 
    // this.auth.authState.subscribe(data => this.user = data.providerData);
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }

  // get authenticated(): boolean {
  //   return this.user == null;
  // }

  // get userId(): object {
  //   return this.auth.authState;
  // }

  signIn() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  signOut() {
    this.auth.signOut();
  }
  
}
