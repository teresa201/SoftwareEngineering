import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutingModule } from './modules/routing.module';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule } from '@angular/http';
import { FormGroup,FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { ResponseComponent } from './response/response.component';
import { NavbarComponent } from './navbar/navbar.component';
import { fakeBackendProvider } from './backend/fake-backend';
import { StartService } from './services/start.service';
import { BaseRequestOptions } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScenarioComponent,
    ResponseComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    fakeBackendProvider,
    MockBackend,
    StartService,
    BaseRequestOptions,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
