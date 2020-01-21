import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs/Rx';

import  { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket;  
  
  constructor() {}

  connect() {
    this.socket = io(environment.websocketUrl);

    const observable = new Observable(observer => {
      this.socket.on('message', data => observer.next(data));
      return () => this.socket.disconnect();
    });

    const observer = {
      next: (data: Object) => {
        this.socket.emit('message', data);
      }
    };

    return Rx.Subject.create(observer, observable);
  }
}
