import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public openMenu: boolean = false;
  public projects: boolean = false;
  public tutorials: boolean = false;
  // public isLoggedIn: boolean;
  // public user: SocialUser;
  public user;

  constructor(public service: SocialAuthService,
              private toast: ToastrService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.auth.authState.subscribe(u => {
      if (u !== null) {
        const user = {
          id: u.uid,
          name: u.displayName
        }
        this.user = user
      } else {
        this.user = null
      }
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
    this.auth.signIn();
  }

  public signOut() {
    this.auth.signOut();
  }

}
