import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { ActorService } from '../actor.service';
import { Movie } from '../movie.model';
import { AngularFire, AuthProviders, FirebaseObjectObservable } from 'angularfire2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  providers: [MovieService, UserService, ActorService]
})
export class MovieDetailComponent implements OnInit {
  movieApiDetails = {};
  movie: Movie;
  topBilled = [];
  actorsImages = [];

  onNetflix: string = null;
  onHulu: string = null;
  onAmazon: string = null;
  onHbo: string = null;
  onItunes: string = null;

  user = null;
  // userFavoriteMovies;
  fbUser: FirebaseObjectObservable<any>;
  constructor(private movieService: MovieService, private actorService: ActorService, private activatedRoute: ActivatedRoute, private router: Router, private af: AngularFire, private us: UserService) {
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

    this.movieService.getMovieDetails(movieID).subscribe(response => {
      this.movieApiDetails['details'] = response;
      this.movieApiDetails['details'] = JSON.parse(this.movieApiDetails['details']._body);
      var res = this.movieApiDetails['details'];
      this.movie = new Movie(res.title, res.id, res.release_year, res.in_theaters, res.release_date, res.rottentomatoes, res.metacritic, res.poster_120x171, res.poster_240x342, res.poster_400x570, res.themoviedb, res.rating);
      this.movie.sources = res.subscription_web_sources;
      this.movie.overview = res.overview;
      this.movie.directors = res.directors;
      this.movie.writers = res.writers;

      if(this.movie.sources) {
        for(var i = 0; i < this.movie.sources.length; i++) {
          if (this.movie.sources[i]['display_name'] === "Hulu") {
            this.onHulu = this.movie.sources[i]['link']
          } else if (this.movie.sources[i]['display_name'] === "Netflix") {
            this.onNetflix = this.movie.sources[i]['link']
          } else if (this.movie.sources[i]['display_name'] === "HBO NOW") {
            this.onHbo = this.movie.sources[i]['link']
          } else if (this.movie.sources[i]['display_name'] === "Amazon Prime") {
            this.onAmazon = this.movie.sources[i]['link']
          }
        }
      }

      this.movieService.getMovieImages(this.movie.themoviedb.toString()).subscribe(response => {
        this.movieApiDetails['images'] = response;
        this.movieApiDetails['images'] = JSON.parse(this.movieApiDetails['images']._body);
        this.movie.backdrop = this.movieService.backdropPrefix + this.movieApiDetails['images'].backdrop_path;
      })
      this.movieService.getMovieCast(movieID).subscribe(res => {
          this.movieApiDetails['cast'] = response;
          this.movieApiDetails['cast'] = JSON.parse(this.movieApiDetails['cast']._body);
          this.movie.cast = this.movieApiDetails['cast'].cast;
          this.topBilled = this.movie.cast.splice(0,5);

          this.topBilled.forEach(actor => {
            var characterName = actor.character_name;
            var actorDetails;
            this.actorService.getActorDetails(actor.id, "cast").subscribe(res => {
              actorDetails = res;
              actorDetails = JSON.parse(actorDetails._body);
              let tempActorThing = []
              tempActorThing.push(actorDetails.name,actorDetails.images['medium']['url'], actorDetails.id, characterName)
              this.actorsImages.push(tempActorThing)
          })
        })
      })
    })
  }
  navigateToActorById(actorId: string){
    this.router.navigate(['person', 'cast',actorId]);
  }
  getCrewById(crewId:string, crewType){
    this.router.navigate(['person', crewType, crewId]);
  }

  addToFavorites(movieId: string) {
    this.us.addToFavoriteMovies(movieId, this.user);
  }
}
