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
import { TodoAppComponent } from './apps/todo-app/todo-app.component';
import { TodoComponent } from './apps/todo-app/todo/todo.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { LoginComponent } from './login/login.component';
import { CrmAppComponent } from './apps/crm-app/crm-app.component';
import { ContactDetailsComponent } from './apps/crm-app/contact-details/contact-details.component';
import { EventsAppComponent } from './apps/events-app/events-app.component';
import { FbsScoresComponent } from './apps/fbs-scores/fbs-scores.component';

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
    TodoComponent,
    LoginComponent,
    CrmAppComponent,
    ContactDetailsComponent,
    EventsAppComponent,
    FbsScoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SocialLoginModule,
  ],
  providers: [
    CovidService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '732591855904-surt36g10me569m9iuemqr5ptu9jqu8g.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId'),
          },
          {
            id: AmazonLoginProvider.PROVIDER_ID,
            provider: new AmazonLoginProvider(
              'clientId'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
