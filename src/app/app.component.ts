import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MessageService } from './message.service';
import { takeUntil } from 'rxjs-compat/operator/takeUntil';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'websocket-front';
  form: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required),
    result: new FormControl('')
  });
  destroy$ = new Subject();

  constructor(private messageService: MessageService){ }

  ngOnInit() {
    this.messageService.messages.pipe(takeUntil(this.destroy$)).subscribe(msg => {
      this.form.patchValue({
        result: msg.text
      });
    });
  }

  onSubmit(): void {
    this.messageService.sendMsg(this.form.get('message').value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}