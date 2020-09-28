import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { CrmService } from 'src/app/shared/crm.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  public user: SocialUser;
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
              private fb: FormBuilder,
              private cService: CrmService) { }

  ngOnInit(): void {
    this.getCompanyData();

    this.checkLogIn();

    this.getContactsByCompany();

    this.initTaskForm();

    this.scrollToTop();
  }

  // Get Contact If Not Logged In
  public getCompanyData() {
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

  // Check if signed in
  public checkLogIn() {
    if (this.user == null) {
      this.service.authState.subscribe(user => {
        this.user = user;
        this.toast.success('Login Successful', this.user.firstName);
      });
    } else {
      this.toast.success('Loged In!', this.user.firstName);
    }
  }

  // Get Contacts
  public getContactsByCompany() {
    // Add isLoading

    if (this.user != null) {
      this.cService.getContactsByCompany(this.user.id, this.company.companyName).subscribe(res => {
        for (const key in res) {
          if (Object.prototype.hasOwnProperty.call(res, key)) {
            const element = res[key];
            this.contacts.push(element);
          }
        }
      });
    } else {
      console.log("Not logged in...");
    }
    // Stop loading
  }
  // Get Tasks

  // Show Add Contact Form
  public showForm(id) {
    if (id == 'new') {
      this.showNewContactForm = true;
      this.initContactForm('new');
    } else {
      this.showEditContactForm = true;
      this.initContactForm(id);
    }
  }

  // Initialize Contact Form
  public initContactForm(id) {
    if (this.user != null) {
      if (id == 'new') {
        return this.contactForm = this.fb.group({
          id: '',
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          title: ''
        });
      } else {
        this.contacts.map(contact => {
          if (id == contact.id) {
            this.contactForm = this.fb.group({
              id: contact.id,
              firstName: contact.firstName,
              lastName: contact.lastName,
              phone: contact.phone,
              email: contact.email,
              title: contact.title
            });
          }
        });
      }
    } else {
      if (id == 'new') {
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
          if (id == contact.id) {
            this.contactForm = this.fb.group({
              id: contact.id,
              firstName: contact.firstName,
              lastName: contact.lastName,
              phone: contact.phone,
              email: contact.email,
              title: contact.title
            });
          }
        });
      }
    }
  }

  // Add New Contact
  public addContact() {
    const data = this.contactForm.value;

    if (data.firstName == '') {
      this.showEditContactForm = false;
      this.showNewContactForm = false;
    }

    if (this.user != null) {
      const index = this.contacts.findIndex(x => x.id == data.id);

      this.contacts.map(x => {
        if (x.id == data.id) {
          if (this.showEditContactForm) {
            let contact = {
              id: data.id,
              userId: this.user.id,
              companyName: this.company.companyName,
              firstName: data.firstName,
              lastName: data.lastName,
              phone: data.phone,
              email: data.email,
              title: data.title
            };

            this.cService.updateContact(contact).subscribe(res => {
              this.contacts.splice(index, 1, res);
              this.showEditContactForm = false;
              this.toast.success(res.firstName, "Contact updated!!");
            });
          }

          if (this.showNewContactForm) {
            let contact = {
              userId: this.user.id,
              companyName: this.company.companyName,
              firstName: '',
              lastName: '',
              phone: '',
              email: '',
              title: ''
            };

            this.cService.addNewContact(contact).subscribe(res => {
              this.contacts.push(res);
              this.showNewContactForm = false;
              this.toast.success(data.firstName, "New contact added!!");
            });
          }
        }
      });
    } else {
      if (this.showEditContactForm) {
        this.contacts.splice(data.id, 1, data);
        this.showEditContactForm = false;
        this.toast.success(data.firstName, "Contact updated!!");
      } else {
        this.contacts.push(data);
        this.showNewContactForm = false;
        this.toast.success(data.firstName, "Contact added!!");
      }
    }
  }

  // Delete Contact
  public deleteContact(id) {
    const index = this.contacts.findIndex(x => x.id == id);

    if (this.user != null) {
      this.cService.deleteContact(id).subscribe(res => {
        this.contacts.splice(index, 1);
        this.toast.warning("Contact removed!!");
      });
    } else {
      this.contacts.splice(index, 1);
      this.toast.warning("Contact removed!!");
    }
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
