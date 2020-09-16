import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from "@angular/router";
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  public todoForm: FormGroup;
  public todoItems = [];
  public completedTodos = [];
  public user: SocialUser;

  constructor(private fb: FormBuilder, private toast: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.user = params.user;
    });

    this.initTodoForm();

    this.scrollToTop();
  }

  // Initialize TodoForm
  public initTodoForm() {
    if (this.user.name == null) {
      this.toast.warning("Data Won't Save! Not Logged In!");
    }
    return this.todoForm = this.fb.group({
      todoItem: '',
      completed: Boolean
    })
  }

  public onSubmit() {
    const data = this.todoForm.value;
    this.todoItems.push(data.todoItem);
    this.initTodoForm();
    this.toast.success(data.todoItem, 'New item added');
  }

  public edit(name, i) {
    let item = this.todoItems.map(todo => {
      if (name == todo) {
        let changed = window.prompt("Change " + name + " to?");
        this.todoItems.splice(i, 1, changed);
      }
    });
  }

  public delete(i) {
    this.todoItems.splice(i, 1);
  }

  public completeTodo(i, item) {
    this.todoItems.splice(i, 1);
    this.completedTodos.push(item);
  }

  public scrollToTop() {
    window.scroll(0, 0);
  }

}
