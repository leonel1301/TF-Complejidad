import { Component, OnInit} from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { GenreService } from '../../services/genre.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  artistName: string = '';
  genre: string = '';
  genres: string[] = [];
  relatedArtists: string[] = [];
  minStreams: number = 0;
  artist: string = '';
  count: number = 0;

  constructor(private artistService: ArtistService, private genreService: GenreService, private http: HttpClient) {}
  ngOnInit(): void {
    this.loadGenres(); // Llama a la función para cargar los géneros al iniciar el componente
  }

  loadGenres(): void {
    this.genreService.getGenres().subscribe((response: any[]) => {
      this.genres = response.map(genre => genre.name);
    });
  }

  validateInputs(): void {
    this.artistService.validateArtist(this.artistName).subscribe(artistValid => {
      if (artistValid) {
        this.genreService.validateGenre(this.genre).subscribe(genreValid => {
          if (genreValid) {
            this.buildFinalUrl();
          } else {
            // Handle invalid genre
            console.log('Invalid genre');
          }
        });
      } else {
        // Handle invalid artist
        console.log('Invalid artist');
      }
    });
  }

  buildFinalUrl(): void {
    const encodedArtist = encodeURIComponent(this.artistName);
    const minStreams = 500000;
    const encodedGenre = encodeURIComponent(this.genre);
    const finalUrl = `https://music-trends-rest-api.onrender.com/api/v1/artists/related?artist_name=${encodedArtist}&min_streams=${minStreams}&genres=${encodedGenre}`;
    console.log(finalUrl);
    
    // Make the request with the final URL
    this.http.get<any>(finalUrl).subscribe((response: any) => {
      this.minStreams = response['Min streams'];
      this.artist = response['artist'];
      this.count = response['count'];
      this.relatedArtists = response['related_artists'];
    });
  }

}
