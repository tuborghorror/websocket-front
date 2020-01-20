import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MessageService } from './message.service';
import { Subject, Subscription } from 'rxjs';

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

  constructor(private messageService: MessageService){ }
 
  ngOnInit() {
    this.subscription = this.messageService.messages.subscribe(msg => {
      this.form.patchValue({
        result: msg.text
      });
    });
  }

  onSubmit(): void {
    this.messageService.sendMsg(this.form.get('message').value);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    
  }
}