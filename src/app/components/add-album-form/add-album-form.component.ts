import {Component, OnInit, ViewChild} from '@angular/core';
import {AlbumsService} from "../../services/albums.service";
import {AlbumEventsService} from "../../services/album-events.service";
import {Album} from "../../interfaces/Album";
import {NgForm} from "@angular/forms";
import {AlertMessageService} from "../../services/alert-message.service";

@Component({
  selector: 'app-add-album-form',
  templateUrl: './add-album-form.component.html',
  styleUrls: ['./add-album-form.component.css']
})
export class AddAlbumFormComponent implements OnInit {
  album: Album = {
    userId: 0,
    id: 0,
    title: ''
  };
  @ViewChild('addAlbumForm') form: NgForm;
  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumEventsService,
    public alertEvents: AlertMessageService
  ) {
  }

  ngOnInit() {
    this.albumEvents.editAlbumkEvent.subscribe((data: Album) => {
      this.album = Object.assign(data);
    });
  }

  onFormSubmit() {
    const newAlbum = {
      userId: 1,
      title: this.album.title
    };
    if (this.album.id) {
      this.albumService.editAlbum(this.album).subscribe((data: Album) => {
        this.albumEvents.fakeEmitEditAlbum(Object.assign(data));
        this.alertEvents.emitEditAlbumAlert({text: 'Задача ИЗМЕНЕНА успешно (успешный ответ сервера)', success: true});
      }, (err) => {
        this.alertEvents.emitEditAlbumAlert({text: 'Задача НЕ ИЗМЕНЕНА (ошибка от сервера)', success: false});
      });
      this.album = {title: '', id: 0, userId: 0};
      console.log('canceling', this.album);
    } else {
      this.albumService.addNewAlbum(newAlbum).subscribe((data: Album) => {
        this.albumEvents.emitAddNewAlbum(data);
        this.alertEvents.emitAddNewAlbumAlert({text: 'Задача добавлена успешно', success: true});
      }, (err) => {
        this.alertEvents.emitAddNewAlbumAlert({text: 'Задача не добавлена', success: false});
      });
      this.form.resetForm();
      console.log('reseting', this.album);
    }
  }

  onCancel() {
    this.albumEvents.emitEditAlbum({title: '', id: 0, userId: 0});
    this.album = {title: '', id: 0, userId: 0};
  }
}
