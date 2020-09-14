import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: SocialUser;
  public isLoggedIn: boolean;

  constructor(private service: SocialAuthService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.service.authState.subscribe((user) => {
      this.user = user;
      if (user) {
        localStorage.setItem('token', user.authToken);
        this.isLoggedIn = true;
        this.toast.success('Login Successful', user.firstName);
      }
    });
  }

  public signInWithGoogle() {
    this.service.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public signOut() {
    this.service.signOut();
    localStorage.removeItem('token');
    this.toast.success('Logged out successfully');
    this.isLoggedIn = false;
  }

}
