import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';
import { AngularFire, AuthProviders, FirebaseObjectObservable } from 'angularfire2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  providers: [MovieService, UserService]
})
export class MovieDetailComponent implements OnInit {
  movieApiDetails = {};
  movie: Movie;
  user = null;
  userFavoriteMovies;
  fbUser: FirebaseObjectObservable<any>;
  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute, private router: Router, private af: AngularFire, private us: UserService) {
    us.checkForUser().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.fbUser = this.us.getUserFB(this.user);
        this.fbUser.subscribe(fbUser => {
          this.userFavoriteMovies = fbUser.favoriteMovies;
        })
      }
    });
  }

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
        this.movie.backdrop = this.movieService.backdropPrefix + this.movieApiDetails['images'].backdrop_path;
      })
      this.movieService.getMovieCast(movieID).subscribe(res => {
          this.movieApiDetails['cast'] = response;
          this.movieApiDetails['cast'] = JSON.parse(this.movieApiDetails['cast']._body);
          this.movie.cast = this.movieApiDetails['cast'].cast;
      })
    });
  }
  navigateToActorById(actorId: string){
    this.router.navigate(['actor', actorId]);
  }

  addToFavorites(movieId: string) {
    this.us.addToFavorites(movieId, this.user);
  }

}
