import { Injectable } from '@angular/core';
import { Movie } from './movie.model';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tmdbKey } from './api-keys';
import { guideBoxKey } from './api-keys';

@Injectable()
export class MovieService {

  constructor(private http: Http) { }

  getTopMovies() {
    return this.http.get("https://api.themoviedb.org/3/movie/popular?api_key=" + tmdbKey.key + "&language=en-US&page=1")
    .map(res => {
      console.log(res);
      return <any[]> res.json();
    });
  }

  getResultsByTerm(category, term) {
    return this.http.get("http://api-public.guidebox.com/v2/search?api_key=" + guideBoxKey.key + "&type=" + category + "&query=" + term)
    .map(res => {
      console.log(res);
      return <any[]> res.json();
    });
  }

}
