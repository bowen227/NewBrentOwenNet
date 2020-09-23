import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  public user = SocialUser;
  public contact;
  public taskForm: FormGroup;
  public tasks = [];
  public completedTasks = [];
  

  constructor(private service: SocialAuthService,
              private toast: ToastrService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getData();

    this.initTaskForm();

    this.scrollToTop();
  }

  // Get Contact If Not Logged In
  public getData() {
    let c = {
      id: this.route.snapshot.paramMap.get('id'),
      firstName: this.route.snapshot.paramMap.get('firstName'),
      lastName: this.route.snapshot.paramMap.get('lastName'),
      company: this.route.snapshot.paramMap.get('company'),
      phone: this.route.snapshot.paramMap.get('phone'),
      fax: this.route.snapshot.paramMap.get('fax'),
      email: this.route.snapshot.paramMap.get('email')
    }
    this.contact = c;
  }

  // Initialize TaskForm
  public initTaskForm() {
    return this.taskForm = this.fb.group({
      id: this.tasks.length,
      task: '',
      date: new Date(),
      completed: false
    }); 
  }

  // Create New Task
  public onSubmit() {
    let task = this.taskForm.value;
    this.tasks.push(task);
    this.initTaskForm();
  }

  // Complete Task
  public completeTask(item, index) {
    this.tasks.splice(index, 1);
    this.completedTasks.push(item);
    this.toast.success("You've completed " + item.task);
  }

  // Edit Task
  public edit(index) {
    this.tasks.map(task => {
      if (task.id == index) {
        let eTask = window.prompt("Change " + task.task + " to?");

        let nTask = {
          id: index,
          task: eTask,
          date: new Date(),
          completed: false
        }
        this.tasks.splice(index, 1, nTask);
        this.toast.success("Changed " + task + " to " + eTask);
      }
    });
  }

  // Delete Task
  public delete(index) {
    this.tasks.splice(index, 1);
    this.toast.warning("Task deleted");
  }

  public scrollToTop() {
    window.scroll(0, 0);
  }

}
