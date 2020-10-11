import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AngularTutorialsComponent } from './angular-tutorials/angular-tutorials.component';
import { CovidComponent } from './covid/covid.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { TodoAppComponent } from './apps/todo-app/todo-app.component';
import { TodoComponent } from './apps/todo-app/todo/todo.component';
import { LoginComponent } from './login/login.component';
import { CrmAppComponent } from './apps/crm-app/crm-app.component';
import { ContactDetailsComponent } from './apps/crm-app/contact-details/contact-details.component';
import { EventsAppComponent } from './apps/events-app/events-app.component';
import { FbsScoresComponent } from './apps/fbs-scores/fbs-scores.component';
import { BlogAppComponent } from './apps/blog-app/blog-app.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'angularTutorials', component: AngularTutorialsComponent },
  { path: 'covid', component: CovidComponent },
  { path: 'contact', component: ContactFormComponent },
  { path: 'todo', component: TodoAppComponent },
  { path: 'todoList/:todo', component: TodoComponent },
  { path: 'signIn', component: LoginComponent },
  { path: 'crm', component: CrmAppComponent },
  { path: 'details', component: ContactDetailsComponent },
  { path: 'events', component: EventsAppComponent },
  { path: 'scores', component: FbsScoresComponent },
  { path: 'blog', component: BlogAppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
