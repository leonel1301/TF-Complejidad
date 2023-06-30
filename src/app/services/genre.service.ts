import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private baseUrl = 'https://music-trends-rest-api.onrender.com/api/v1';

  constructor(private http: HttpClient) {}

  getGenres() {
    const url = `${this.baseUrl}/artists/genres`;
    return this.http.get<any[]>(url);
  }

  validateGenre(genre: string) {
    return this.getGenres().pipe(
      map((response: Object) => {
        if (Array.isArray(response)) {
          return response.some(a => a.name === genre);
        }
        return false;
    })
    );
  }
}

