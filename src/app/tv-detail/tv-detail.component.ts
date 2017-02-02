import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Show } from '../show.model';
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
  foundShow;
  userFavorite;
  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute, private router: Router, private af: AngularFire, private us: UserService) {
    us.checkForUser().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.fbUser = this.us.getUserFB(this.user);
        this.fbUser.subscribe(fbUser => {
          if (!fbUser.favoriteShows){
            fbUser.favoriteShows = [];
          }
          if (fbUser.favoriteShows && this.show){
            this.userFavorite = fbUser.favoriteShows.includes(this.foundShow.id);
          }
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
      this.foundShow = new Show(this.show.title, this.show.id, this.show.themoviedb, this.show.overview, this.show.poster, this.show.banner, this.show.rating, this.show.network, this.show.cast, this.show.first_aired);
    })
  }

  addToFavorites() {
    this.userFavorite = true;
    this.us.addToFavoriteShows(this.show, this.user);
  }
  removeFromFavorites(){
    this.userFavorite = false;
    this.us.removeFromFavoriteShows(this.show, this.user);
  }

  navigateToActorById(castMemberID: string){
    this.router.navigate(['person', castMemberID]);
  }
}
