import { Injectable } from '@angular/core';
import { Movie } from './movie.model';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Keys } from './api-keys';

@Injectable()
export class MovieService {

  constructor(private http: Http) { }

  getTopMovies() {
    return this.http.get('api call')
    .map(res => {
      return <any[]> res.json();
    });
  }

  getMovieDetails(movieId: string){
    return this.http.get("http://api-public.guidebox.com/v2/movies/".concat(movieId).concat("/?api_key=").concat(Keys.guidebox))
  }

  getMovieImages(movieId: string){
    return this.http.get("http://api-public.guidebox.com/v2/movies/".concat(movieId).concat("/images/?api_key=").concat(Keys.guidebox).concat('&filter=backgrounds'))
  }

}
