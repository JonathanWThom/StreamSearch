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
        var posterPrefix = "http://image.tmdb.org/t/p/w185/";
        newCredits = creditResponse;
        newCredits = JSON.parse(newCredits._body);
        if(this.role === "cast"){
          this.credits = newCredits.cast.map(function(res){
          return {'id': res.id, 'title': res.title, 'imageUrl': posterPrefix.concat(res.poster_path), 'character': res.character};
          });
        } else if (this.role === "crew") {
          newCredits.crew.forEach(res =>{
            if(res.job === "Director") {
              this.credits.push({'id': res.id, 'title': res.title, 'imageUrl': posterPrefix.concat(res.poster_path), 'job': res.job});
            }
          });
        }
      })
    })
  }

  navigateToMovie(tmdbID: string): void{
    var foundMovie;
    this.movieService.getMovieByTmdbID(tmdbID).subscribe(response => {
      foundMovie = response;
      foundMovie = JSON.parse(foundMovie._body);
      this.router.navigate(['movie', foundMovie.id]);
    })
  }
}
