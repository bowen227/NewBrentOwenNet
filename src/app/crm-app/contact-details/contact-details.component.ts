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
  public company;
  public contacts = [];
  public showNewContactForm: boolean = false;
  public showEditContactForm: boolean = false;
  public contactForm: FormGroup;
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
      company: this.route.snapshot.paramMap.get('company'),
      street: this.route.snapshot.paramMap.get('street'),
      city: this.route.snapshot.paramMap.get('city'),
      state: this.route.snapshot.paramMap.get('state'),
      zip: this.route.snapshot.paramMap.get('zip'),
      phone: this.route.snapshot.paramMap.get('phone'),
      fax: this.route.snapshot.paramMap.get('fax')
    }

    this.company = c;
  }

  // Show Add Contact Form
  public showForm(index) {
    if (index == 'new') {
      this.showNewContactForm = true;
      this.initContactForm('new');
    } else {
      this.showEditContactForm = true;
      this.initContactForm(index);
    }
  }

  // Initialize Contact Form
  public initContactForm(index) {
    if (index == 'new') {
      return this.contactForm = this.fb.group({
        id: this.contacts.length,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        title: ''
      });
    } else {
      this.contacts.map(contact => {
        if (index == contact.id) {
          this.contactForm = this.fb.group({
            id: contact.id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            phone: contact.phone,
            email: contact.email,
            title: contact.title
          });
          this.showEditContactForm = true
        }
      });
    }
  }

  // Add New Contact
  public addContact() {
    let contact = this.contactForm.value;
    if (contact.firstName == '') {
      this.showEditContactForm = false;
      this.showNewContactForm = false;
    } else {
      if (this.showEditContactForm) {
        this.contacts.splice(contact.id, 1, contact);
        this.showEditContactForm = false;
      } else {
        this.contacts.push(contact);
        this.showNewContactForm = false;
      }
    }
  }

  // Delete Contact
  public deleteContact(index) {
    this.contacts.splice(index, 1);
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
