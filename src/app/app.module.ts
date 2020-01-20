import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MessageService } from './message.service';
import { WebsocketService } from './websocket.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    MessageService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
