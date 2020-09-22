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
  public showEditForm: boolean = false;
  public isLoading: boolean = false;
  public isLoggedIn: boolean;
  public popup: boolean;
  public contacts = [];

  constructor(private fb: FormBuilder,
              private toast: ToastrService,
              private service: SocialAuthService,
              private route: Router) { }

  ngOnInit(): void {
    this.checkLogIn();

    this.initContactForm();
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

  // Initialize ContactForm
  public initContactForm() {
    return this.contactForm = this.fb.group({
      firstName: '',
      lastName: ''
    });
  }

  public onSubmit() {
    this.isLoading = true;
    
    const data = this.contactForm.value;

    let contact = {
      id: this.contacts.length,
      firstName: data.firstName,
      lastName: data.lastName
    };

    this.contacts.push(contact);
    this.initContactForm();
    this.isLoading = false;
  }

  public initEditForm(id) {
    this.contacts.map(contact => {
      if (id == contact.id) {
        this.showEditForm = true;
        this.editForm = this.fb.group({
          id: id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          company: '',
          phone: '',
          fax: '',
          email: ''
        });
      }
    });
  }

  public onEdit() {
    let data = this.editForm.value;

    this.contacts.splice(data.id, 1, data);
    this.showEditForm = false;
  }

  public delete(index) {
    this.contacts.splice(index, 1);
  }

  public contactDetails(contact) {
    this.route.navigate(['/details', JSON.stringify(contact)]);
  }

}
