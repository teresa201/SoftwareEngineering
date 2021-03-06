import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';
import { ScenarioComponent } from '../scenario/scenario.component';
import { ResponseComponent } from '../response/response.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'scenario/:id/:id1/:id2/:id3/:id4', component: ScenarioComponent },
  { path: 'response', component: ResponseComponent },



]
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]

})

export class RoutingModule{}
