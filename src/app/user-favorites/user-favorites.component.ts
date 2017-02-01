import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';
import { Show } from '../show.model';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.css'],
  providers: [UserService, MovieService]
})
export class UserFavoritesComponent implements OnInit {
  // @Input() fbUser: FirebaseListObservable<any[]>;
  user;
  fbUser;
  favoriteMovies;
  favoriteShows;
  movieApiDetails;
  showApiDetails;


  constructor(private router: Router, private us: UserService, private ms: MovieService) {
    us.checkForUser().subscribe(user => {
      var that = this;
      this.user = user;
      this.us.getUserFB(this.user).subscribe(fbUser => {
        this.fbUser = fbUser;
        if (!fbUser.favoriteMovies) {
          fbUser.favoriteMovies = [];
        }
        this.favoriteMovies = this.fbUser.favoriteMovies;
        this.favoriteMovies.forEach(function(movie) {
          that.ms.getMovieDetails(movie.toString()).subscribe(response => {
            that.movieApiDetails = response;
            that.movieApiDetails = JSON.parse(that.movieApiDetails._body);
            var res = that.movieApiDetails;
            var foundMovie = new Movie(res.title, res.id, res.release_year, res.in_theaters, res.release_date, res.rottentomatoes, res.metacritic, res.poster_120x171, res.poster_240x342, res.poster_400x570, res.themoviedb, res.rating);
            foundMovie.sources = res.subscription_web_sources;
            foundMovie.overview = res.overview;
            foundMovie.directors = res.directors;
            foundMovie.writers = res.writers;

            console.log(foundMovie)

            that.favoriteMovies.push(foundMovie);
          });
        })
        if (!fbUser.favoriteShows) {
          fbUser.favoriteShows = [];
        }
        this.favoriteShows = this.fbUser.favoriteShows;
        this.favoriteShows.forEach(function(show) {
          that.ms.getShowDetails(show.toString()).subscribe(response => {
            that.showApiDetails = response;
            that.showApiDetails = JSON.parse(that.showApiDetails._body);
            var res = that.showApiDetails;
            var foundShow = new Show(res.title, res.id, res.themoviedb, res.overview, res.poster, res.banner, res.rating, res.network, res.cast, res.first_aired);

            console.log(foundShow)

            that.favoriteShows.push(foundShow);
          });
        })
      });

    });
  }

  ngOnInit() {
  }

  removeFavoriteMovies(movieId: string){
    this.us.removeFromFavoriteMovies(movieId, this.user);
  }

  removeFavoriteShows(showId: string){
    this.us.removeFromFavoriteShows(showId, this.user);
  }

  navigateToMovie(movieId: string){
    this.router.navigate(['movie', movieId]);
  }

  navigateToShow(showId: string) {
    this.router.navigate(['show', showId]);
  }
}
