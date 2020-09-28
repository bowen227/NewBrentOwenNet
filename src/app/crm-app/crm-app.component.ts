import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { CrmService } from '../shared/crm.service';

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
  public contacts = [];
  public searchTerm = '';
  public showSearched: boolean = false;
  public searchedContacts = [];
  public indevPopup: boolean = true;

  constructor(private fb: FormBuilder,
              private toast: ToastrService,
              private service: SocialAuthService,
              private route: Router,
              private cService: CrmService) { }

  ngOnInit(): void {
    this.checkLogIn();

    this.getCompaniesByUser();
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

  // Get Companies By User
  public getCompaniesByUser() {
    this.isLoading = true;
    if (this.user != null) {
      this.cService.getCompaniesByUser(this.user.id).subscribe(res => {
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
    if (this.user != null) {
      if (id == 'new') {
        return this.contactForm = this.fb.group({
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
              id: contact.id,
              company: contact.companyName,
              street: contact.street,
              city: contact.city,
              state: contact.state,
              zip: contact.zip,
              phone: contact.phone,
              fax: contact.fax
            });
          }
        });
      }
    } else {
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
              id: contact.id,
              company: contact.company,
              street: contact.street,
              city: contact.city,
              state: contact.state,
              zip: contact.zip,
              phone: contact.phone,
              fax: contact.fax
            });
          }
        });
      }
    }
  }

  public onSubmit() {
    const data = this.contactForm.value;

    if (data.company == '') {
      this.showNewContactForm = false;
      this.showEditForm = false;
      this.toast.warning("Form not complete!", "Something went wrong...");
    }

    if (this.user != null) {
      const index = this.contacts.findIndex(x => x.id == data.id);

      this.contacts.map(x => {
        if (x.id == data.id) {
          if (this.showEditForm) {
            let company = {
              id: data.id,
              userId: this.user.id,
              companyName: data.company,
              street: data.street,
              city: data.city,
              state: data.state,
              zip: data.zip,
              phone: data.phone,
              fax: data.fax
            };

            this.cService.updateCompany(company).subscribe(res => {
              this.contacts.splice(index, 1, res);
              this.showEditForm = false;
              this.toast.success(res.companyName, "Company updated!!");
            });
          }

          if (this.showNewContactForm) {
            let company = {
              userId: this.user.id,
              companyName: data.company,
              street: data.street,
              city: data.city,
              state: data.state,
              zip: data.zip,
              phone: data.phone,
              fax: data.fax
            };
      
            this.cService.addNewCompany(company).subscribe(res => {
              this.contacts.push(res);
              this.showNewContactForm = false;
              this.toast.success(data.company, 'New company added!');
            });
          }
        }
      });
    } else {
      if (this.showEditForm) {
        this.contacts.splice(data.id, 1, data);
        this.showEditForm = false;
        this.toast.success(data.company, "Company updated!!");
      } else {
        this.contacts.push(data);
        this.showNewContactForm = false;
        this.toast.success(data.company, 'Company added!!');
      }
    }
  }

  public delete(id) {
    if (this.user != null) {
      this.contacts.map(c => {
        if (c.id == id) {
          this.cService.deleteCompanyById(id).subscribe(res => {
            this.contacts.splice(id, 1);
            this.toast.warning("Company removed!!");
          });
        }
      });
    } else {
      this.contacts.map(c => {
        if (c.id == id) {
          this.contacts.splice(id, 1);
          this.toast.warning("Company removed!!");
        }
      });
    }
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
