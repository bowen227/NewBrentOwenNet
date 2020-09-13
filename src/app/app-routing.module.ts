import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AngularTutorialsComponent } from './angular-tutorials/angular-tutorials.component';
import { CovidComponent } from './covid/covid.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { TodoAppComponent } from './todo-app/todo-app.component';
import { TodoComponent } from './todo-app/todo/todo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'angularTutorials', component: AngularTutorialsComponent },
  { path: 'covid', component: CovidComponent },
  { path: 'contact', component: ContactFormComponent },
  { path: 'todo', component: TodoAppComponent },
  { path: 'todoList/:id', component: TodoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
