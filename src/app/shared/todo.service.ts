import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  readonly GroupsURI = "https://localhost:5001/api/Group";
  readonly TodosURI ="https://localhost:5001/Todo";

  // GET
  public getGroupsByUser(user) {
    return this.http.get(this.GroupsURI + '/' + user).pipe(map(res => res as JSON));
  }

  // POST
  public addNewGroup(group) {
    return this.http.post(this.GroupsURI, group).pipe(map(res => res as JSON));
  }

  // PUT
  public updateGroupName(id, nObj) {
    return this.http.put(`${this.GroupsURI}/${id}`, nObj, { headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })}).pipe(map(res => res as any));
  }

  // DELETE
  public deleteGroupById(id) {
    return this.http.delete(this.GroupsURI + '/' + id).pipe(map(res => res as JSON));
  }
}
