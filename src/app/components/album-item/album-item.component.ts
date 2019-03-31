import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from "../../interfaces/Album";
import { AlbumsService } from "../../services/albums.service";
import { AlertMessageService } from "../../services/alert-message.service";
import { AlbumEventsService } from "../../services/album-events.service";

@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.css']
})
export class AlbumItemComponent implements OnInit {
  @Input() item: Album;
  @Output() outputDelete: EventEmitter<number> = new EventEmitter<number>();
  @Output() outputEdit: EventEmitter<Album> = new EventEmitter<Album>();
  @Output() outputCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  editAlbumId: number;

  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumEventsService,
    public alertEvents: AlertMessageService
  ) {
  }

  ngOnInit() {
    this.albumEvents.editAlbumkEvent.subscribe((data: Album) => {
      if (data.id === this.item.id) {
        this.editAlbumId = data.id;
      } else {
        this.editAlbumId = 0;
      }
    });
    this.albumEvents.fakeEditAlbumkEvent.subscribe((data: Album) => {
      if (data.id === this.item.id) {
        this.editAlbumId = 0;
      }
    });
  }

  onDelete(id: number) {
    const confirmDelete = confirm('Уверены в том, чтобы удалить?');
    if (confirmDelete) {
      this.albumService.deleteAlbum(id).subscribe(() => {
        this.outputDelete.emit(id);
        this.alertEvents.emitDeleteAlbumAlert({text: 'Задача УДАЛЕНА успешно', success: true});
      });
    }
  }

  onEdit() {
    const editableItem: Album = {
      userId: this.item.userId,
      id: this.item.id,
      title: this.item.title
    };
    this.outputEdit.emit(Object.assign(editableItem));
  }

  onCancel() {
    this.outputEdit.emit({userId: 0, id: 0, title: ''});
  }
}
