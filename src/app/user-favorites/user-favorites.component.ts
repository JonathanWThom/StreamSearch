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
export class UserFavoritesComponent implements PointerEventInit {
  // @Input() fbUser: FirebaseListObservable<any[]>;
  user;
  fbUser;
  favoriteShowIDs;
  movieApiDetails;
  showApiDetails;

  constructor(private router: Router, private us: UserService, private ms: MovieService) {
  }

  ngOnInit() {
    this.us.checkForUser().subscribe(foundUser => {
      var that = this;
      this.user = foundUser;
      this.us.getUserFB(this.user).subscribe(fbUser => {
        this.fbUser = fbUser;
        if (!fbUser.favoriteMovies) {
          this.fbUser.favoriteMovies = [];
        }

        if (!fbUser.favoriteShows) {
          this.favoriteShowIDs = [];
        }
      });
    });
  }

  removeFavoriteMovies(movie: Movie){
    console.log(typeof movie);
    this.us.removeFromFavoriteMovies(movie, this.user);
  }

  removeFavoriteShows(show: Show){
    console.log(typeof show);
    this.us.removeFromFavoriteShows(show, this.user);
  }

  navigateToMovie(movieId: string){
    this.router.navigate(['movie', movieId]);
  }

  navigateToShow(showId: string) {
    this.router.navigate(['show', showId]);
  }
}
