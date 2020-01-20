import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'websocket-front';
  form: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required),
    result: new FormControl('')
  });

  constructor(private chat: MessageService){ }

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      this.form.patchValue({
        result: msg.text
      });
    });
  }

  onSubmit(): void {
    this.chat.sendMsg(this.form.get('message').value);
  }
}