import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'

import { Router, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { UserDataComponent } from './user-data/user-data.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { ContactMakerComponent } from './contact-maker/contact-maker.component';
import { ContactsComponent } from './contacts/contacts.component';

const appRoutes: Routes = [
  { path: '', component:ContactsComponent},
  { path: 'contacts', component:ContactsComponent},
  { path: 'userdata', component:UserDataComponent},
  { path: 'userdata/:id', component:UserDataComponent},
  { path: '**', component:NoPageFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    UserDataComponent,
    NoPageFoundComponent,
    ContactMakerComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
