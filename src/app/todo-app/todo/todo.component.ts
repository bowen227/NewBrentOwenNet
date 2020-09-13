import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  public todoForm: FormGroup;
  public todoItems = [];
  public completedTodos = [];

  constructor(private fb: FormBuilder, private toast: ToastrService) { }

  ngOnInit(): void {
    this.initTodoForm();
  }

  // Initialize TodoForm
  public initTodoForm() {
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

}
