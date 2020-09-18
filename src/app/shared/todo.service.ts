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

  // GET Group By User
  public getGroupsByUser(user) {
    return this.http.get(this.GroupsURI + '/' + user).pipe(map(res => res as JSON));
  }

  // POST New Group
  public addNewGroup(group) {
    return this.http.post(this.GroupsURI, group).pipe(map(res => res as JSON));
  }

  // PUT Group
  public updateGroupName(id, nObj) {
    return this.http.put(`${this.GroupsURI}/${id}`, nObj, { headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })}).pipe(map(res => res as any));
  }

  // DELETE Group
  public deleteGroupById(id) {
    return this.http.delete(this.GroupsURI + '/' + id).pipe(map(res => res as JSON));
  }

  // GET Todo By Group
  public getTodosByGroup(id, group) {
    let data = { userId: id, groupName: group.groupName}
    return this.http.get(this.TodosURI + '/' + data).pipe(map(res => res as JSON));
  }

  // POST New Item
  public addNewTodoToGroup(item) {
    return this.http.post(this.TodosURI, item).pipe(map(res => res as JSON));
  }

  // PUT Item
  public updateItemName(todo) {
    return this.http.put(`${this.TodosURI}/${todo.id}`, todo, { headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })}).pipe(map(res => res as any));
  }

  // DELETE Item
  public deleteTodoById(id) {
    return this.http.delete(this.TodosURI + '/' + id).pipe(map(res => res as JSON));
  }
}
