import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Message } from "../interfaces/Message";

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {
  private alertAddSource = new BehaviorSubject({});
  public alertAddEvent = this.alertAddSource.asObservable();
  private alertDeleteSource = new BehaviorSubject({});
  public alertDeleteEvent = this.alertDeleteSource.asObservable();
  private alertEditSource = new BehaviorSubject({});
  public alertEditEvent = this.alertEditSource.asObservable();

  constructor() {
  }

  emitAddNewAlbumAlert(value: Message): void {
    this.alertAddSource.next(value);
  }

  emitDeleteAlbumAlert(value: Message): void {
    this.alertDeleteSource.next(value);
  }

  emitEditAlbumAlert(value: Message): void {
    this.alertEditSource.next(value);
  }
}
