import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
import { Album } from "../../interfaces/Album";
import { AlbumEventsService } from "../../services/album-events.service";

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {
  albums: Album[];

  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumEventsService,
  ) {
  }

  ngOnInit() {
    this.albumService.getAlbums().subscribe((data: Album[]) => {
      this.albums = data;
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('complete');
    });

    this.albumEvents.albumAddEventObservableSubject.subscribe((data: Album) => {
      if (data.title) {
        this.albums.unshift(data);
      }
    });
    this.albumEvents.fakeEditAlbumkEvent.subscribe((data: Album) => {
      if (JSON.stringify(data) != '{}') {
        console.log(data.id);
        this.albums.forEach((item, i) => {
          if (item.id == data.id) {
            this.albums.splice(i, 1, data);
          }
        });
      }
    });
  }

  onOutputDelete(id: number): void {
    this.albums = this.albums.filter(todo => todo.id != id);
  }

  onOutputEdit(data: Album): void {
    this.albumEvents.emitEditAlbum(Object.assign(data));
  }

  onOutputCancel(data: boolean): void {
    this.albumEvents.cancelEditAlbum(data);
  }
}
