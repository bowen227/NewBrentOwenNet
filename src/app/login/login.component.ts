import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: SocialUser;
  public isLoggedIn: boolean;

  constructor(private service: SocialAuthService, private toast: ToastrService, private loc: Location) { }

  ngOnInit(): void {
    this.service.authState.subscribe((user) => {
      this.user = user;
      this.isLoggedIn = (user != null);
    });

    this.scrollToTop();
  }

  public signInWithGoogle() {
    this.service.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      if (user != null) {
        this.loc.back();
      } else {
        this.toast.warning('Login Failed!')
      }
    });
  }

  public signOut() {
    this.service.signOut();
    this.toast.success('Logged out successfully');
  }

  public scrollToTop() {
    window.scroll(0, 0);
  }

}
