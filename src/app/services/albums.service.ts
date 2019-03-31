import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Album } from "../interfaces/Album";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiUrl}/albums`);
  }
  addNewAlbum(value: Album): Observable<Album> {
    return this.http.post<Album>(`${this.apiUrl}/albums`, value);
  }
  deleteAlbum(id: number): Observable<object> {
    return this.http.delete<object>(`${this.apiUrl}/albums/${id}`);
  }
  editAlbum(value: Album): Observable<Album> {
    return this.http.put<Album>(`${this.apiUrl}/albums/${value.id}`, value);
  }
}
