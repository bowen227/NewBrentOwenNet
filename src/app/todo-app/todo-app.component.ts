import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, NgModel } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.css']
})
export class TodoAppComponent implements OnInit {
  public user: SocialUser;
  public groupForm: FormGroup;
  public todoGroups = [];
  public isLoggedIn: boolean;
  public popup: boolean;

  constructor(private fb: FormBuilder, private toast: ToastrService, private service: SocialAuthService) { }

  ngOnInit(): void {
    this.checkLogIn();

    this.initGroupForm();

    this.scrollToTop();
    // this.todoGroups.push("Home Repair", "Landscaping", "Work");
  }

  // Check if signed in
  public checkLogIn() {
    if (this.user == null) {
      this.service.authState.subscribe(user => {
        this.user = user;
        // this.toast.success('Login Successfull!', user.firstName);
      });

      this.isLoggedIn = (this.user != null);
      this.popup = (this.user != null);

      if (this.user != null) {
        this.toast.success('Login Successful!', this.user.firstName);
      }
    }
    // this.service.authState.subscribe(user => {
    //   this.user = user;
      
    // });
  }

  // Close popup
  public togglePopup() {
    this.popup = !this.popup;
  }

  // Initialize GroupForm
  public initGroupForm() {
    return this.groupForm = this.fb.group({
      groupName: '',
    });
  }

  public onSubmit() {
    const data = this.groupForm.value;
    this.todoGroups.push(data.groupName);
    this.initGroupForm();
    this.toast.success(data.groupName, 'New group added');

    if (this.user == null) {
      this.toast.warning('Not Logged In');
    }
  }

  public edit(name, i) {
    let item = this.todoGroups.map(todo => {
      if (name == todo) {
        let changed = window.prompt("Change " + name + " to?");
        this.todoGroups.splice(i, 1, changed);
      }
    });
  }

  public delete(i) {
    this.todoGroups.splice(i, 1);
  }

  public scrollToTop() {
    window.scroll(0, 0);
  }

}
