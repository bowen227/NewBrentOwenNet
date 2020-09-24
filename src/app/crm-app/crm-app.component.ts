import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crm-app',
  templateUrl: './crm-app.component.html',
  styleUrls: ['./crm-app.component.css']
})
export class CrmAppComponent implements OnInit {
  public user: SocialUser;
  public contactForm: FormGroup;
  public editForm: FormGroup;
  public showNewContactForm: boolean = false;
  public showEditForm: boolean = false;
  public isLoading: boolean = false;
  public isLoggedIn: boolean;
  public popup: boolean;
  // public contacts = [
  //   { id: 0, firstName: 'Brent', lastName: 'Owen', company: '', phone: '', fax: '', email: '' },
  //   { id: 1, firstName: 'Brandon', lastName: 'Owen', company: '', phone: '', fax: '', email: '' },
  //   { id: 2, firstName: 'Easton', lastName: 'Owen', company: '', phone: '', fax: '', email: '' },
  //   { id: 3, firstName: 'Kelly', lastName: 'Owen', company: '', phone: '', fax: '', email: '' },
  //   { id: 4, firstName: 'Emily', lastName: 'Owen', company: '', phone: '', fax: '', email: '' },
  //   { id: 5, firstName: 'Cindy', lastName: 'Thompson', company: '', phone: '', fax: '', email: '' },
  //   { id: 6, firstName: 'Beverly', lastName: 'Stakely', company: '', phone: '', fax: '', email: '' },
  //   { id: 7, firstName: 'David', lastName: 'Thomas', company: '', phone: '', fax: '', email: '' },
  //   { id: 8, firstName: 'Mark', lastName: 'Sawyer', company: '', phone: '', fax: '', email: '' },
  //   { id: 9, firstName: 'Jason', lastName: 'Shelton', company: '', phone: '', fax: '', email: '' },
  //   { id: 10, firstName: 'Staci', lastName: 'Saffles', company: '', phone: '', fax: '', email: '' },
  //   { id: 11, firstName: 'Amber', lastName: 'Scroggins', company: '', phone: '', fax: '', email: '' },
  // ];
  public contacts = [];
  public searchTerm = '';
  public showSearched: boolean = false;
  public searchedContacts = [];
  public indevPopup: boolean = true;

  constructor(private fb: FormBuilder,
              private toast: ToastrService,
              private service: SocialAuthService,
              private route: Router) { }

  ngOnInit(): void {
    this.checkLogIn();
  }

  // Check if signed in
  public checkLogIn() {
    if (this.user == null) {
      this.service.authState.subscribe(user => {
        this.user = user;
      });

      this.isLoggedIn = (this.user != null);
      this.popup = (this.user != null);

      if (this.user != null) {
        this.toast.success('Login Successfull!', this.user.firstName);
      }
    }
  }

  // Show New Contact From or Edit Form
  public showForm(id) {
    if (id == 'new') {
      this.showNewContactForm = true;
      this.initContactForm('new');
    } else {
      this.showEditForm = true;
      this.initContactForm(id);
    }
  }

  // Initialize ContactForm
  public initContactForm(id) {
    if (id == 'new') {
      return this.contactForm = this.fb.group({
        id: this.contacts.length,
        company: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        fax: ''
      });
    } else {
      this.contacts.map(contact => {
        if (id == contact.id) {
          this.contactForm = this.fb.group({
            id: id,
            company: contact.company,
            street: contact.street,
            city: contact.city,
            state: contact.state,
            zip: contact.zip,
            phone: contact.phone,
            fax: contact.fax
          });
          this.showEditForm = true;
        }
      });
    }
  }

  public onSubmit() {
    let data = this.contactForm.value;
    if (data.firstName == '') {
      this.showNewContactForm = false;
      this.showEditForm = false;
    } else {
      if (this.showEditForm) {
        this.contacts.splice(data.id, 1, data);
        this.showEditForm = false;
      } else {
        this.contacts.push(data);
        this.showNewContactForm = false;
      }
    }
  }

  public delete(index) {
    this.contacts.splice(index, 1);
  }

  public contactDetails(contact) {
    this.route.navigate(['/details', JSON.stringify(contact)]);
  }

  public searchContact(event) {
    if (this.searchedContacts.length > 0) {
      this.searchedContacts = [];
      this.contacts.map(contact => {
        if (contact.firstName.toLowerCase().includes(event.toLowerCase())) {
          this.searchedContacts.push(contact);
        }
      });
      this.showSearched = true;
    } else {
      this.contacts.map(contact => {
        if (contact.firstName.toLocaleLowerCase().includes(event.toLowerCase())) {
          this.searchedContacts.push(contact);
        }
      });
      this.showSearched = true;
    }
  }

  public togglePopup() {
    this.indevPopup = !this.indevPopup;
  }

}
