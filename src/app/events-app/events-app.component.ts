import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import {formatDate} from '@angular/common';
import { distinct } from 'rxjs/operators';

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

    this.showCountDown();
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
      const nEvent = {
        id: this.events.length,
        eventName: data.eventName,
        eventDate: data.eventDate
      };
      this.events.push(nEvent);
      this.showNewEventForm = false;
      this.showEditEventForm = false;
      this.toast.success(nEvent.eventName, "Created!");
      this.showCountDown();
    }
  }

  public showCountDown() {
    if (this.events.length > 0) {

      this.events.forEach(element => {
        let index = this.events.findIndex(e => e.id == element.id).toString();

        let end = new Date(element.eventDate);
        let now = new Date();

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        let distance = end.getTime() - now.getTime();
    
        let timer;

        if (distance < 0) {
          clearInterval(timer);
          document.getElementById(index).innerHTML = 'Completed';
          return;
        }
        
        function showRemaing() {
          let now = new Date();
          let distance = end.getTime() - now.getTime();
          if (distance < 0) {
            clearInterval(timer);
            document.getElementById(index).innerHTML = 'Completed';
            return;
          }
    
          let days = Math.floor(distance / day);
          let hours = Math.floor((distance % day) / hour);
          let minutes = Math.floor((distance % hour) / minute);
          let seconds = Math.floor((distance % minute) / second);
          document.getElementById(index).innerHTML = days + 'D : ' + hours + 'H : ' + minutes + 'M : ' + seconds + 'S';
        }
    
        timer = setInterval(showRemaing, 1000);
      });
    }
  }

}
