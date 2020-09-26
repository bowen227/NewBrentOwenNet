import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, NgModel } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { ToastrService } from 'ngx-toastr';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.css']
})
export class TodoAppComponent implements OnInit {
  public user: SocialUser;
  public groupForm: FormGroup;
  public loadingGroups: boolean = false;
  public todoGroups = [];
  public isLoggedIn: boolean;
  public popup: boolean;

  constructor(private fb: FormBuilder,
              private toast: ToastrService,
              private service: SocialAuthService,
              private tService: TodoService) { }

  ngOnInit(): void {
    this.checkLogIn();

    this.initGroupForm();

    this.getGroupsByUser();

    this.scrollToTop();
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
  }

  // Get Todo Groups From API By User
  public getGroupsByUser() {
    if (this.user != null) {
      this.loadingGroups = true;
      this.tService.getGroupsByUser(this.user.id).subscribe(res => {
        for (const key in res) {
          if (Object.prototype.hasOwnProperty.call(res, key)) {
            const element = res[key];
            let group = {
              id: element.id,
              groupName: element.groupName
            }
            this.todoGroups.push(group);
          }
        }
        this.loadingGroups = false;
      });
    } else {
      console.log("No user logged in....");
    }
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
    this.loadingGroups = true;
    const data = this.groupForm.value;

    if (this.user != null) {
      let group = {
        groupName: data.groupName,
        userId: this.user.id
      };
  
      this.tService.addNewGroup(group).subscribe(res => {
        this.todoGroups.push(res);
      });
      this.initGroupForm();
      this.toast.success(data.groupName, 'New group added!');
      this.loadingGroups = false;
    } else {
      this.todoGroups.push(data);
      this.initGroupForm();
      this.toast.success("New Group " + data.groupName + " added!!!");
      this.toast.warning("You're not logged in!");
      this.loadingGroups = false;
    }
    
  }

  public edit(id, name, index) {
    if (this.user != null) {
      this.todoGroups.map(group => {
        if (group.id == id) {
          let nGroup = window.prompt("Change " + name + " to?");
  
          let nObj = { groupName: nGroup };
  
          if (nGroup != null) {
            this.tService.updateGroupName(id, nObj).subscribe(res => {
              let updatedGroupName = { id: id, groupName: res.groupName };
              this.todoGroups.splice(index, 1, updatedGroupName);
              this.toast.success("Changed " + name + " to " + nGroup);
            });
          } else {
            this.toast.warning("You didn't change the name...");
          }
        }
      });
    } else {
      this.todoGroups.map(todo => {
        if (name == todo.groupName) {
          let changed = window.prompt("Change " + '"' + name + '"' + " to?");

          let nObj = { id: id, groupName: changed };
          this.todoGroups.splice(index, 1, nObj);
          this.toast.success("Changed " + name + " to " + changed);
          this.toast.warning("Changes will not save unless you login!");
        }
      });
    }
  }

  public delete(id, index, name) {
    if (this.user != null) {
      this.tService.deleteGroupById(id).subscribe(res => {
        this.todoGroups.splice(index, 1);
        this.toast.warning(name + " group removed!!");
      });
    } else {
      this.todoGroups.splice(index, 1);
      this.toast.warning(name + " group removed!!");
    }
  }

  public scrollToTop() {
    window.scroll(0, 0);
  }

}
