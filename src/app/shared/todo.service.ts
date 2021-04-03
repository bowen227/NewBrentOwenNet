import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  // readonly GroupsURI = "https://localhost:5001/api/Group";
  readonly GroupsURI = "https://exerciselist.azurewebsites.net/api/Group";
  // readonly TodosURI ="https://localhost:5001/api/Todo";
  readonly TodosURI = "https://exerciselist.azurewebsites.net/api/Todo";

  // GET Group By User
  public getGroupsByUser(user: string) {
    return this.http.get(this.GroupsURI + '/' + user).pipe(map(res => res as JSON));
  }

  // POST New Group
  public addNewGroup(group: object) {
    return this.http.post(this.GroupsURI, group).pipe(map(res => res as JSON));
  }

  // PUT Group
  public updateGroupName(id: string, nObj: object) {
    return this.http.put(`${this.GroupsURI}/${id}`, nObj, { headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })}).pipe(map(res => res as any));
  }

  // DELETE Group
  public deleteGroupById(id: string) {
    return this.http.delete(this.GroupsURI + '/' + id).pipe(map(res => res as JSON));
  }

  // GET Todo By User and Group
  public getTodosByGroup(id: string, group: number) {
    return this.http.get(this.TodosURI + '/' + id + '/' + group).pipe(map(res => res as JSON));
  }

  // POST New Item
  public addNewTodoToGroup(item: object) {
    return this.http.post(this.TodosURI, item).pipe(map(res => res as JSON));
  }

  // PUT Item
  public updateItemName(todo: object) {
    return this.http.put(`${this.TodosURI}`, todo, { headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })}).pipe(map(res => res as any));
  }

  // DELETE Item
  public deleteTodoById(id: string) {
    return this.http.delete(this.TodosURI + '/' + id).pipe(map(res => res as JSON));
  }
}
