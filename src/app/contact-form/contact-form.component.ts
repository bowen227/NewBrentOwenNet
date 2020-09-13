import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, NgModel } from '@angular/forms';
import emailjs from 'emailjs-com';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  public contactForm: FormGroup;

  constructor(private fb: FormBuilder, private toast: ToastrService) { }

  ngOnInit(): void {
    this.initContactForm();
  }

  // Initialize Contact Form
  public initContactForm() {
    return this.contactForm = this.fb.group({
      email: '',
      name: '',
      message: ''
    });
  }

  public onSubmit() {
    const data = this.contactForm.value;

    let templateParams = {
      email: data.email,
      name: data.name,
      message: data.message
    };

    console.log(templateParams);

    emailjs.send('_brentowen.net', 'template0227', templateParams, 'user_qvEM45Aok0GbkMxuzB4nI')
    .then((res) => {
      console.log('SUCCESS!', res.status, res.text);
      this.toast.success('Thank you for reaching out!', templateParams.name);
    }, (err) => {
      console.error('FAILED....', err);
      this.toast.error('Something went wrong...', 'Please try later...');
    });

    this.initContactForm();
  }
}
