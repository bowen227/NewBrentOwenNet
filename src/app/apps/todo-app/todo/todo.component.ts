import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from "@angular/router";
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TodoService } from 'src/app/shared/todo.service';
import { identifierModuleUrl } from '@angular/compiler';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  public todoForm: FormGroup;
  public todoItems = [];
  public completedTodos = [];
  // public user: SocialUser;
  public user;
  public group;
  public loadingTodos = false;

  constructor(private fb: FormBuilder,
              private toast: ToastrService, 
              private route: ActivatedRoute,
              private tService: TodoService,
              private service: SocialAuthService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.group = params.todo;
    });

    this.auth.auth.authState.subscribe(u => {
      if (u !== null) {
        const user = {
          id: u.uid,
          name: u.displayName
        }
        this.user = user
        this.getTodosByGroup();

      } else {
        this.user = null
      }
    });

    // this.checkLogIn();

    this.initTodoForm();

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
        let data = [];
        for (const key in res) {
          if (Object.prototype.hasOwnProperty.call(res, key)) {
            const element = res[key];
            let todo = {
              id: element.id,
              groupName: element.groupName,
              todo: element.todo,
              completed: element.completed
            }
            data.push(todo);
          }
        }
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
      this.loadingTodos = false;
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
        groupName: this.group,
        todo: data.todoItem,
        completed: false
      };

      this.tService.addNewTodoToGroup(nTodo).subscribe(res => {
        // console.log(res);
        this.todoItems.push(res);
      });
      this.initTodoForm();
      this.toast.success(data.todoItem, 'New item added');
    } else {
      let nTodo = {
        groupName: this.group,
        todo: data.todoItem,
        completed: false
      };
      this.todoItems.push(nTodo);
      this.initTodoForm();
      this.toast.success(nTodo.todo, 'New item added');
    }
    
  }

  public edit(todo, i) {
    // console.log(todo);
    if (this.user != null) {
      this.todoItems.map(item => {
        if (item.id == todo.id) {
          let nTodo = window.prompt("Change " + todo.todo + " to?");

          let nObj = {
            id: todo.id,
            userId: this.user.id,
            groupName: this.group,
            todo: nTodo,
            completed: false
          }

          if (nTodo != null) {
            this.tService.updateItemName(nObj).subscribe(res => {
              let updatedTodoName = {
                id: res.id,
                userId: this.user.id,
                groupName: this.group.groupName,
                todo: res.todo,
                completed: false
              }
              this.todoItems.splice(i, 1, updatedTodoName);
              this.toast.success("Changed " + todo.todo + " to " + res.todo);
            });
          } else {
            this.toast.warning("You didn't change the name...");
          }
        }
      });
    } else {
      this.todoItems.map(item => {
        if (item.todo == todo.todo) {
          let changed = window.prompt("Change " + '"' + item.todo + '"' + " to?");

          let nObj = { todo: changed, completed: false };
          this.todoItems.splice(i, 1, nObj);
          this.toast.success("Changed " + todo.todo + " to " + changed);
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

  public completeTodo(item, i) {
    if (this.user != null) {
      this.todoItems.map(todo => {
        if (todo.id == item.id) {
          let cTodo = {
            id: item.id,
            userId: this.user.id,
            groupName: this.group,
            todo: item.todo,
            completed: true
          }

            this.tService.updateItemName(cTodo).subscribe(res => {
            // console.log(res.todo);
            this.todoItems.splice(i, 1);
            this.completedTodos.push(res);
            this.toast.success("You've completed " + res.todo);
          });
        }
      });
    } else {
      this.todoItems.splice(i, 1);
      this.completedTodos.push(item);
      console.log(item);
      this.toast.success("You've completed " + item.todoItem);
    }
  }

  public scrollToTop() {
    window.scroll(0, 0);
  }

}
