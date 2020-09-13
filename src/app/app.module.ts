import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AngularTutorialsComponent } from './angular-tutorials/angular-tutorials.component';
import { CovidComponent } from './covid/covid.component';
import { CovidService } from './shared/covid.service';
import { HttpClientModule } from '@angular/common/http';
import { WorldDataComponent } from './covid/graphs/world-data/world-data.component';
import { WorldGraphComponent } from './covid/graphs/world-graph/world-graph.component';
import { StateGraphComponent } from './covid/graphs/state-graph/state-graph.component';
import { UsBreakdownComponent } from './covid/graphs/us-breakdown/us-breakdown.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { TodoAppComponent } from './todo-app/todo-app.component';
import { TodoComponent } from './todo-app/todo/todo.component';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    AngularTutorialsComponent,
    SafePipe,
    CovidComponent,
    WorldDataComponent,
    WorldGraphComponent,
    StateGraphComponent,
    UsBreakdownComponent,
    ContactFormComponent,
    TodoAppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    CovidService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
