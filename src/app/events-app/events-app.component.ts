import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';

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
      const event = {
        eventName: data.eventName,
        eventDate: data.eventDate
      };
      // Add service
      this.toast.success(data.eventName, "Created!");
    }
  }

}
