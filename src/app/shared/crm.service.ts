import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrmService {

  constructor(private http: HttpClient) { }

  // readonly CompanyURI = "https://localhost:5001/api/Company";
  // readonly ContactURI = "https://localhost:5001/api/CompanyContacts";
  // readonly TaskURI = "https://localhost:5001/api/CompanyTask";

  readonly CompanyURI = "https://exerciselist.azurewebsites.net/api/Company";
  readonly ContactURI = "https://exerciselist.azurewebsites.net/api/CompanyContacts";
  readonly TaskURI = "https://exerciselist.azurewebsites.net/api/CompanyTask";


  // GET Company By User
  public getCompaniesByUser(user) {
    return this.http.get(this.CompanyURI + '/' + user).pipe(map(res => res as JSON));
  }

  // POST New Company
  public addNewCompany(company) {
    return this.http.post(this.CompanyURI, company).pipe(map(res => res as JSON));
  }

  // PUT Company
  public updateCompany(updatedCompany) {
    return this.http.put(`${this.CompanyURI}`, updatedCompany, { headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })}).pipe(map(res => res as any));
  }

  // DELETE Company
  public deleteCompanyById(id) {
    return this.http.delete(this.CompanyURI + '/' + id).pipe(map(res => res as JSON));
  }

  // GET Contacts By User and Company
  public getContactsByCompany(user, company) {
    console.log(company);
    return this.http.get(this.ContactURI + '/' + user + '/' + company).pipe(map(res => res as JSON));
  }

  // POST New Contacts
  public addNewContact(contact) {
    return this.http.post(this.ContactURI, contact).pipe(map(res => res as JSON));
  }

  // PUT Contact
  public updateContact(updatedContact) {
    return this.http.put(this.ContactURI, updatedContact, { headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })}).pipe(map(res => res as any));
  }

  // DELETE Contact
  public deleteContact(id) {
    return this.http.delete(this.ContactURI + '/' + id).pipe(map(res => res as JSON));
  }

  // GET Contacts By User and Company
  public getTasksByCompany(user, company) {
    console.log(company);
    return this.http.get(this.TaskURI + '/' + user + '/' + company).pipe(map(res => res as JSON));
  }

  // POST New Contacts
  public addNewTask(contact) {
    return this.http.post(this.TaskURI, contact).pipe(map(res => res as JSON));
  }

  // PUT Contact
  public updateTask(updatedContact) {
    return this.http.put(this.TaskURI, updatedContact, { headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })}).pipe(map(res => res as any));
  }

  // DELETE Contact
  public deleteTask(id) {
    return this.http.delete(this.TaskURI + '/' + id).pipe(map(res => res as JSON));
  }
}
