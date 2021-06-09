import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgChatModule } from 'ng-chat';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChatWindowComponentComponent } from './ng-chat-window-component/ng-chat-window-component.component';

@NgModule({
  declarations: [
    AppComponent,
    NgChatWindowComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgChatModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
