import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  providers: [MovieService]
})
export class MovieDetailComponent implements OnInit {
  movieApiDetails = {};
  movie: Movie;
  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    var movieID;
    this.activatedRoute.params.forEach((urlParametersArray) => {
      movieID = urlParametersArray['id'];
    });
    // this.movieApiDetails['details'] = this.movieService.getMovieDetails(movieID).title;
    this.movieService.getMovieDetails(movieID).subscribe(response => {
      this.movieApiDetails['details'] = response;
      this.movieApiDetails['details'] = JSON.parse(this.movieApiDetails['details']._body);
      var res = this.movieApiDetails['details'];
      this.movie = new Movie(res.title, res.id, res.release_year, res.in_theatres, res.release_date, res.rotten_tomatoes, res.metacritic, res.poster_small, res.poster_medium, res.poster_large, res.themoviedb, res.rating);

      this.movieService.getMovieImages(this.movie.themoviedb.toString()).subscribe(response => {
        this.movieApiDetails['images'] = response;
        this.movieApiDetails['images'] = JSON.parse(this.movieApiDetails['images']._body);
        this.movie.backdrop = this.movieService.prefix + this.movieApiDetails['images'].backdrop_path;
      })
    });
  }

}
