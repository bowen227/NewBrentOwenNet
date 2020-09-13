import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public openMenu: boolean;
  public projects: boolean;
  public tutorials: boolean;

  constructor() { }

  ngOnInit(): void {
    this.openMenu = false;
    this.projects = false;
    this.tutorials = false;
  }

  public toggleMenu() {
    this.openMenu = !this.openMenu;
  }

  public toggleMore(item) {
    if (item == 'projects') {
      this.tutorials = false;
      this.projects = !this.projects;
    }

    if  (item == 'tutorials') {
      this.projects = false;
      this.tutorials = !this.tutorials;
    }
  }

  public openFile() {
    window.open('../../assets/WebDevResume.pdf');
  }

}
