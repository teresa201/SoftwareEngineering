import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutingModule } from './modules/routing.module';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule } from '@angular/http';
import { FormGroup,FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { ResponseComponent } from './response/response.component';
import { NavbarComponent } from './navbar/navbar.component';
import { fakeBackendProvider } from './backend/fake-backend';
import { StartService } from './services/start.service';
import { GeneratorService } from './services/generator-service'
import { ResponseService } from './services/response.service';
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
    ReactiveFormsModule,
    MultiselectDropdownModule 
  ],
  providers: [
    fakeBackendProvider,
    MockBackend,
    StartService,
    GeneratorService,
    ResponseService,
    BaseRequestOptions,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
