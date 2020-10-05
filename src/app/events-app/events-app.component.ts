import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-events-app',
  templateUrl: './events-app.component.html',
  styleUrls: ['./events-app.component.css']
})
export class EventsAppComponent implements OnInit {
  public user: SocialUser;
  public isLoggedIn: boolean;
  public eventsForm: FormGroup;
  public showNewEventForm: boolean = false;
  public showEditEventForm: boolean = false;
  public isLoading: boolean = false;
  public events = [];
  public date = new Date();
  public popup: boolean;

  constructor(private fb: FormBuilder,
              private toast: ToastrService,
              private service: SocialAuthService) { }

  ngOnInit(): void {
    this.checkLogIn();
  }

  // Check if signed in
  public checkLogIn() {
    if (this.user == null) {
      this.service.authState.subscribe(user => {
        this.user = user;
      });

      this.isLoggedIn = (this.user != null);
      this.popup = (this.user != null);
    }
  }

  public showForm(id) {
    if (id == 'new') {
      this.initEventForm(id);
      this.showNewEventForm = true;
    }
  }

  public initEventForm(id) {
    if (id == 'new') {
      return this.eventsForm = this.fb.group({
        eventName: '',
        eventDate: '',
      });
    }
  }

  public onSubmit() {
    const data = this.eventsForm.value;

    if (data.eventName == '') {
      this.toast.warning("Incomplete Event!");
      this.showNewEventForm = false;
      this.showEditEventForm = false;
      return 
    }

    if (this.user != null) {
      const nEvent = {
        eventName: data.eventName,
        eventDate: data.eventDate
      };
      // Add service
      
      this.toast.success(data.eventName, "Created!");
    } else {
      this.events.push(data);
      this.showNewEventForm = false;
      this.showEditEventForm = false;
      this.toast.success(data.eventName, "Created!");
    }
  }

  public showDaysLeft(date) {
    let today = new Date();
    let end = new Date(date);
    // let daysLeft = Math.floor((Date.UTC(
    //     end.getFullYear(), end.getMonth(), end.getDate()) - 
    //     Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / (1000*60*60*24));
    let days = end.getDate() - today.getDate() + 1;
    let hours = days * 24;
    let min = hours * 60;
    let sec = min * 60;
    let timeLeft = {'days': days, 'hours': hours}
    return timeLeft;
  }

  public showHoursLeft(date) {
    let today = new Date();
    let end = new Date(date);
    let days = end.getDate() - today.getDate() + 1;
    let hours = days * 24;
    return hours;
  }

}
