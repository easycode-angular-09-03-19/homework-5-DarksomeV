import {Component, OnInit} from '@angular/core';
import {AlertMessageService} from "../../services/alert-message.service";
import {Message} from "../../interfaces/Message";

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {
  status = false;
  message: string;


  constructor(
    public alertEvents: AlertMessageService
  ) {
  }

  ngOnInit() {


    this.alertEvents.alertAddEvent.subscribe((data: Message) => {
      if (data.text) {
        this.message = data.text;
        this.status = data.success;
      }

      this.resetMessage();
    });

    this.alertEvents.alertDeleteEvent.subscribe((data: Message) => {
      if (data.text) {
        this.message = data.text;
        this.status = data.success;
      }

      this.resetMessage();
    });
    this.alertEvents.alertEditEvent.subscribe((data: Message) => {
      if (data.text) {
        this.message = data.text;
        this.status = data.success;
      }

      this.resetMessage();
    });
  }

  resetMessage() {
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

}
