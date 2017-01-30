import { Injectable } from '@angular/core';
import { Movie } from './movie.model';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { movieKey } from './api-keys';

@Injectable()
export class MovieService {

  constructor(private http: Http) { }

  getTopMovies() {
    return this.http.get('api call')
    .map(res => {
      return <any[]> res.json();
    });
  }

}
