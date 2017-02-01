import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Actor } from '../actor.model';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';
import { ActorService } from '../actor.service';


@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css'],
  providers: [ ActorService, MovieService ]
})
export class ActorDetailComponent implements OnInit {
  actor: Actor;
  newActor;
  credits: Object[] =[];
  role: string;
  newCredits;
  moviesActedIn= [];
  moviesDirected= [];
  moviesWritten= [];
  moviesProduced= [];
  showMoviesActed: boolean = true;
  showMoviesDirected: boolean = true;
  showMoviesWritten: boolean = true;
  showMoviesProduced: boolean = true;




  constructor(private actorService: ActorService, private movieService: MovieService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let personGbID: string;
    let actorTmdbID: string;
    var newCredits;
    this.activatedRoute.params.forEach((urlParametersArray) => {
      personGbID = urlParametersArray['id'];
      this.role = urlParametersArray['role'];

    })
    this.actorService.getActorDetails(personGbID, this.role).subscribe(response => {
      this.newActor = response;
      this.newActor = JSON.parse(this.newActor._body);
      this.actor = new Actor(this.newActor.id, this.newActor.name, this.newActor.description, this.newActor.imdb, this.newActor.images);
      actorTmdbID = this.newActor.themoviedb;

      this.actorService.getActorCredits(actorTmdbID).subscribe(creditResponse => {
        var posterPrefix = "https://image.tmdb.org/t/p/w185/";
        this.newCredits = creditResponse;
        this.newCredits = JSON.parse(this.newCredits._body);
        console.log(this.newCredits)
        this.newCredits.cast.forEach(film => {
          if (film.poster_path !== null ){
            this.moviesActedIn.push(film)
          }
        })
        this.newCredits.crew.forEach(film => {
          if(film.job === 'Director' && film.poster_path){
            this.moviesDirected.push(film)
          } else if (film.job === 'Screenplay' && film.poster_path){
            this.moviesWritten.push(film)
          } else if (film.department === 'Production' && film.poster_path){
            this.moviesProduced.push(film)
          }
        })

      })
    })
  }

  navigateToMovie(tmdbID: string, media_type): void{
    if(media_type === "movie") {
      var foundMovie;
      this.movieService.getMovieByTmdbID(tmdbID).subscribe(response => {
        foundMovie = response;
        foundMovie = JSON.parse(foundMovie._body);
        if(Object.keys(foundMovie).length === 0){
          alert('No streaming data available for this film. Try another.')
        } else {
          this.router.navigate(['movie', foundMovie.id]);
        }
      })
    } else if (media_type === "tv" ){
      this.router.navigate(['show', tmdbID]);
    }
  }

  toggleShow(role) {
    this.showMoviesActed = false;
    this.showMoviesDirected = false;
    this.showMoviesWritten = false;
    this.showMoviesProduced = false;
    this[role] = true;
  }

  actorActive() {

  }

  directorActive() {

  }

  writerActive() {

  }

  producerActive() {

  }
}
