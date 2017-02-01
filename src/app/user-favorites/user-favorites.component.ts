import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { UserService } from '../user.service';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';

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


  constructor(private us: UserService, private ms: MovieService) {
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
      });

    });
  }

  ngOnInit() {
  }

  removeFavorite(movieId: string){
    this.us.removeFromFavorites(movieId, this.user);
  }

}
