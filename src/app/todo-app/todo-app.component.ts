import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.css']
})
export class TodoAppComponent implements OnInit {
  public groupForm: FormGroup;
  public todoGroups = [];
  public isSignedIn: boolean = false;
  public notSignedIn: boolean;

  constructor(private fb: FormBuilder, private toast: ToastrService) { }

  ngOnInit(): void {
    this.initGroupForm();
    this.signedIn();
    // this.todoGroups.push("Home Repair", "Landscaping", "Work");
  }

  // Check if signed in
  public signedIn() {
    if (localStorage.getItem('token')) {
    this.isSignedIn = !this.isSignedIn;
    } else {
      this.notSignedIn = true;
    }
  }

  // Close popup
  public togglePopup() {
    this.notSignedIn = !this.notSignedIn;
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

}
