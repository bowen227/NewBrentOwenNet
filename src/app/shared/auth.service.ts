import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // public authState: any = null;
  public user: any = null;

  constructor(public auth: AngularFireAuth, public toast: ToastrService, public route: Router) { 
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
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
      this.toast.success("Login Successful!")
    })
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.toast.warning("Logout Successful!")
    }).then(() => {
      this.route.navigateByUrl('')
    });
  }
  
}
