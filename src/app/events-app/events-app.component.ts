import { Component, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-events-app',
  templateUrl: './events-app.component.html',
  styleUrls: ['./events-app.component.css']
})
export class EventsAppComponent implements OnInit {
  public user: SocialUser;

  constructor() { }

  ngOnInit(): void {
  }

  public showForm(id) {
    if (id == 'new') {
      console.log("Add new event");
    }
  }

}
