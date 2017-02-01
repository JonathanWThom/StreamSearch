import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';
import { AngularFire, AuthProviders, FirebaseObjectObservable } from 'angularfire2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.component.html',
  styleUrls: ['./tv-detail.component.css'],
  providers: [MovieService, UserService]
})
export class TvDetailComponent implements OnInit {
  user;
  fbUser;
  show;
  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute, private router: Router, private af: AngularFire, private us: UserService) {
    us.checkForUser().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.fbUser = this.us.getUserFB(this.user);
        this.fbUser.subscribe(fbUser => {
          // this.userFavoriteMovies = fbUser.favoriteMovies;
        })
      }
    });
  }

  ngOnInit() {
    var movieID;
    this.activatedRoute.params.forEach((urlParametersArray) => {
      movieID = urlParametersArray['id'];
    });

    this.movieService.getShowDetails(movieID).subscribe(response => {
      this.show = response;
      this.show = JSON.parse(this.show._body);
      console.log(this.show);
    })
  }

  addToFavorites(showId: string) {
    this.us.addToFavoriteMovies(showId, this.user);
  }
  removeFromFavorites(showId: string){
    this.us.removeFromFavorites(showId, this.user);
  }
}
