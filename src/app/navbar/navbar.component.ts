import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public openMenu: boolean = false;
  public projects: boolean = false;
  public tutorials: boolean = false;
  public isLoggedIn: boolean;
  public user: SocialUser;

  constructor(public service: SocialAuthService,
              private toast: ToastrService) { }

  ngOnInit(): void {
    this.service.authState.subscribe((user) => {
      this.user = user;
      this.isLoggedIn = (user != null);
    });
  }

  public toggleMenu() {
    this.openMenu = !this.openMenu;
  }

  public toggleMore(item) {
    if (item == 'projects') {
      this.tutorials = false;
      this.projects = !this.projects;
    }

    if (item == 'tutorials') {
      this.projects = false;
      this.tutorials = !this.tutorials;
    }
  }

  public openFile() {
    window.open('../../assets/WebDevResume.pdf');
  }

  public signIn() {
    this.service.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      if (user != null) {
        this.toast.success("Login Successfull", this.user.firstName);
      } else {
        this.toast.warning("Login Failed..");
      }
    })
  }

  public signOut() {
    this.service.signOut();
    this.toast.success("Logged out successfully!");
  }

}
