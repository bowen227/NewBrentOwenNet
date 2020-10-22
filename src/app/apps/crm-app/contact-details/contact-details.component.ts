import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
import { CrmService } from 'src/app/shared/crm.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  // public user: SocialUser;
  public user;
  public company;
  public contacts = [];
  public showNewContactForm: boolean = false;
  public showEditContactForm: boolean = false;
  public contactForm: FormGroup;
  public taskForm: FormGroup;
  public showNewTaskForm: boolean = false;
  public showEditTaskForm: boolean = false;
  public leads = [];
  public completedTasks = [];
  public isLoading: boolean = false;
  

  constructor(private service: SocialAuthService,
              private toast: ToastrService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private cService: CrmService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.auth.authState.subscribe(u => {
      if (u !== null) {
        const user = {
          id: u.uid,
          name: u.displayName
        }
        this.user = user

        const id = this.route.snapshot.paramMap.get('id');
        this.cService.getCompanyById(id).subscribe(res => {
          this.company = res;
        })
        
        setTimeout(() => {
          this.getContactsByCompany();
          this.getTasks();
        }, 1500)

      } else {
        this.user = null
      }
    });

    // this.checkLogIn();

    this.scrollToTop();

  }

  // Get Contacts
  public getContactsByCompany() {
    this.isLoading = true;

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
    this.isLoading = false;
  }
  // Get Tasks
  public getTasks() {
    if (this.user != null) {
      this.cService.getTasksByCompany(this.user.id, this.company.companyName).subscribe(res => {
        for (const key in res) {
          if (Object.prototype.hasOwnProperty.call(res, key)) {
            const element = res[key];
            if (element.completed == true) {
              this.completedTasks.push(element);
            } else {
              this.leads.push(element);
            }
          }
        }
      });
    } else {
      console.log("Not Logged in...");
    }
  }
  
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
      this.toast.warning("You have to have a first name");
    }

    if (this.user != null) {
      const index = this.contacts.findIndex(x => x.id == data.id);

      if (this.showEditContactForm) {
        this.contacts.map(x => {
          if (x.id == data.id) {
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
        });
      }

      if (this.showNewContactForm) {
        let contact = {
          userId: this.user.id,
          companyName: this.company.companyName,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          title: data.title
        };

        this.cService.addNewContact(contact).subscribe(res => {
          this.contacts.push(res);
          this.showNewContactForm = false;
          this.toast.success(data.firstName, "New contact added!!");
        });
      }
    } else {
      if (this.showEditContactForm) {
        this.contacts.splice(data.id, 1, data);
        this.showEditContactForm = false;
        this.toast.success(data.firstName, "Contact updated!!");
      } else {
        if (this.showNewContactForm) {
          this.contacts.push(data);
          this.showNewContactForm = false;
          this.toast.success(data.firstName, "Contact added!!");
        }
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

  // Show Lead Form
  public showTaskForm(id) {
    if (id == 'new') {
      this.showNewTaskForm = true;
      this.initTaskForm('new');
    } else {
      this.showEditTaskForm = true;
      this.initTaskForm(id);
    }
  }

  // Initialize TaskForm
  public initTaskForm(id) {
    if (this.user != null) {
      if (id == 'new') {
        return this.taskForm = this.fb.group({
          task: '',
          service: '',
          stage: '',
          completed: false
        });
      } else {
        this.leads.map(lead => {
          if (id == lead.id) {
            this.taskForm = this.fb.group({
              id: lead.id,
              userId: lead.userId,
              company: lead.companyName,
              task: lead.task,
              completed: lead.completed
            });
          }
        });
      }
    } else {
      if (id == 'new') {
        return this.taskForm = this.fb.group({
          id: this.leads.length,
          company: this.company.companyName,
          task: '',
          completed: false
        });
      } else {
        this.leads.map(lead => {
          if (id == lead.id) {
            this.taskForm = this.fb.group({
              id: lead.id,
              company: lead.company,
              task: lead.task,
              completed: lead.completed
            });
          }
        });
      }
    }
  }

  // Create New Lead
  public onSubmit() {
    const data = this.taskForm.value;

    if (data.task.length < 1) {
      this.showNewTaskForm = false;
      this.showEditTaskForm = false;
      this.toast.warning("You didn't add a lead..");
    }

    if (this.user != null) {
      const index = this.leads.findIndex(x => x.id == data.id);

      if (this.showEditTaskForm && index != null) {
        this.leads.map(x => {
          if (x.id == data.id) {
            let task = {
              id: data.id,
              userId: data.userId,
              company: data.company,
              task: data.task,
              completed: data.completed
            };
  
            this.cService.updateTask(task).subscribe(res => {
              this.leads.splice(index, 1, res);
              this.showEditTaskForm = false;
              this.toast.success("Updated task!!");
            });
          }
        });
      }

      if (this.showNewTaskForm) {
        let task = {
          userId: this.user.id,
          company: this.company.companyName,
          task: data.task,
          completed: data.completed
        };

        this.cService.addNewTask(task).subscribe(res => {
          this.leads.push(res);
          this.showNewTaskForm = false;
          this.toast.success("New task added!!");
        });
      }
    } else {
      if (this.showEditTaskForm) {
        this.leads.splice(data.id, 1, data);
        this.showEditTaskForm = false;
        this.toast.success("Task updated!!");
      } else {
        if (this.showNewTaskForm) {
          this.leads.push(data);
          this.showNewTaskForm = false;
        }
      }
    }
  }

  // Complete Lead
  public completeLead(item, index) {
    if (this.user != null) {
      this.leads.map(task => {
        if (task.id == item.id) {
          let cTask = {
            id: item.id,
            userId: item.userId,
            company: item.companyName,
            task: item.task,
            completed: true
          };

          this.cService.updateTask(cTask).subscribe(res => {
            this.leads.splice(index, 1);
            this.completedTasks.push(res);
            this.toast.success("You've completed a task!!");
          });
        }
      });
    } else {
      this.leads.splice(index, 1);
      this.completedTasks.push(item);
      this.toast.success("You've completed " + item.task);
    }
  }

  // Delete Lead
  public deleteLead(id) {
    const index = this.leads.findIndex(x => x.id == id);

    if (this.user != null) {
      this.cService.deleteTask(id).subscribe(res => {
        this.leads.splice(index, 1);
        this.toast.warning("Task deleted!!");
      });
    } else {
      this.leads.splice(index, 1);
      this.toast.warning("Task deleted");
    }
  }

  public scrollToTop() {
    window.scroll(0, 0);
  }

}
