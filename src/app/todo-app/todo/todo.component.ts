import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from "@angular/router";
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TodoService } from 'src/app/shared/todo.service';

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
  public group;
  public loadingTodos = false;

  constructor(private fb: FormBuilder,
              private toast: ToastrService, 
              private route: ActivatedRoute,
              private tService: TodoService,
              private service: SocialAuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.group = params.todo;
    });

    this.checkLogIn();

    this.initTodoForm();

    this.getTodosByGroup();

    this.scrollToTop();
  }

  // Check if signed in
  public checkLogIn() {
    if (this.user == null) {
      this.service.authState.subscribe(user => {
        this.user = user;
      });
    } else {
      this.toast.warning("Not Signed In!!");
    }
  }

  // Initialize TodoForm
  public initTodoForm() {
    return this.todoForm = this.fb.group({
      todoItem: '',
      completed: Boolean
    });
  }

  // Get Todo's From API By Group
  public getTodosByGroup() {
    if (this.user != null) {
      this.loadingTodos = true;
      this.tService.getTodosByGroup(this.user.id, this.group).subscribe(res => {
        // Push Completed to completedTodos
        // Push Not Completed to todoItems
        let data = [];
        data.push(res);
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (element.completed == true) {
              this.completedTodos.push(element);
            } else {
              this.todoItems.push(element);
            }
          }
        }
      });
    } else {
      console.log(this.completedTodos, this.todoItems);
    }
    this.loadingTodos = false;
  }

  public onSubmit() {
    const data = this.todoForm.value;

    if (this.user != null) {
      let nTodo = {
        userId: this.user.id,
        groupName: this.group.groupName,
        todo: data.todoItem,
        completed: false
      };

      this.tService.addNewTodoToGroup(nTodo).subscribe(res => {
        this.todoItems.push(res);
      });
      this.initTodoForm();
      this.toast.success(data.todoItem, 'New item added');
    } else {
      this.todoItems.push(data);
      this.initTodoForm();
      this.toast.success(data.todoItem, 'New item added');
    }
    
  }

  public edit(todo, i) {
    if (this.user != null) {
      this.todoItems.map(item => {
        if (item.id == todo.id) {
          let nTodo = window.prompt("Change " + todo.todoItem + " to?");

          let nObj = {
            userId: this.user.id,
            groupName: this.group.groupName,
            todo: nTodo,
            completed: false
          }

          if (nTodo != null) {
            this.tService.updateItemName(nObj).subscribe(res => {
              let updatedTodoName = {
                userId: this.user.id,
                groupName: this.group.groupName,
                todo: res.todoItem,
                completed: false
              }
              this.todoItems.splice(i, 1, updatedTodoName);
              this.toast.success("Changed " + todo.todoItem + " to " + res.todoItem);
            });
          } else {
            this.toast.warning("You didn't change the name...");
          }
        }
      });
    } else {
      this.todoItems.map(item => {
        if (item.todoItem == todo.todoItem) {
          let changed = window.prompt("Change " + '"' + item.todoItem + '"' + " to?");

          let nObj = { todoItem: changed, completed: false };
          this.todoItems.splice(i, 1, nObj);
          this.toast.success("Changed " + todo.todoItem + " to " + changed);
        }
      });
    }
  }

  public delete(id, index) {
    if (this.user != null) {
      this.tService.deleteTodoById(id).subscribe(res => {
        this.todoItems.splice(index, 1);
        this.toast.warning("Item removed!!");
      });
    } else {
      this.todoItems.splice(index, 1);
      this.toast.warning("Item removed!!");
    }
  }

  public completeTodo(i, item) {
    this.todoItems.splice(i, 1);
    this.completedTodos.push(item);
  }

  public scrollToTop() {
    window.scroll(0, 0);
  }

}
