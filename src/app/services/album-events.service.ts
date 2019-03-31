import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Album } from "../interfaces/Album";

@Injectable({
  providedIn: 'root'
})
export class AlbumEventsService {
  private albumAddEventSource = new BehaviorSubject({});
  public albumAddEventObservableSubject = this.albumAddEventSource.asObservable();
  private editAlbum = new BehaviorSubject({});
  public editAlbumkEvent = this.editAlbum.asObservable();

  private fakeEditAlbum = new BehaviorSubject({});
  public fakeEditAlbumkEvent = this.fakeEditAlbum.asObservable();

  private cancelAlbum = new BehaviorSubject(false);
  public cancelAlbumkEvent = this.cancelAlbum.asObservable();

  constructor() {
  }

  emitAddNewAlbum(value: Album): void {
    this.albumAddEventSource.next(value);
  }

  emitEditAlbum(value: Album): void {
    this.editAlbum.next(Object.assign(value));
  }

  cancelEditAlbum(value: boolean): void {
    this.cancelAlbum.next(value);
  }

  fakeEmitEditAlbum(value: Album): void {
    this.fakeEditAlbum.next(Object.assign(value));
  }
}
