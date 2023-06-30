import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private baseUrl = 'https://music-trends-rest-api.onrender.com/api/v1';

  constructor(private http: HttpClient) {}

  getArtists() {
    const url = `${this.baseUrl}/artists`;
    return this.http.get(url);
  }

  validateArtist(artist: string) {
    return this.getArtists().pipe(
      map((response: Object) => {
        if (Array.isArray(response)) {
          return response.some(a => a.name === artist);
        }
        return false;
      })
    );
  }
}
