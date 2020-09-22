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
  

  constructor(private service: SocialAuthService,
              private toast: ToastrService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getData();

    this.initTaskForm();
  }

  // Get Contact If Not Logged In
  public getData() {
    let c = {
      id: this.route.snapshot.paramMap.get('id'),
      firstName: this.route.snapshot.paramMap.get('firstName'),
      lastName: this.route.snapshot.paramMap.get('lastName')
    }
    this.contact = c;
  }

  // Initialize TaskForm
  public initTaskForm() {
    return this.taskForm = this.fb.group({
      task: '',
      date: new Date()
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
    console.log(item);
  }

  // Edit Task
  public edit(index) {
    console.log(index);
  }

  // Delete Task
  public delete(index) {
    console.log(index);
  }

}
