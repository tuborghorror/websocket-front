import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'websocket-front';
  form: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required),
    result: new FormControl('')
  });
  subscription: Subscription = null;

  constructor(private messagesSubscription: MessageService){ }
 
  ngOnInit() {
    this.subscription = this.messagesSubscription.messages.subscribe(msg => {
      this.form.patchValue({
        result: msg.text
      });
    });
  }

  onSubmit(): void {
    this.messagesSubscription.sendMsg(this.form.get('message').value);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    
  }
}