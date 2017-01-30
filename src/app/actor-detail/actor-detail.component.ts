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
  credits: Object[];

  constructor(private actorService: ActorService, private movieService: MovieService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let actorGbID: string;
    let actorTmdbID: string;
    var newCredits;
    this.activatedRoute.params.forEach((urlParametersArray) => {
      actorGbID = urlParametersArray['id'];
    })
    this.actorService.getActorDetails(actorGbID).subscribe(response => {
      this.newActor = response;
      this.newActor = JSON.parse(this.newActor._body);
      this.actor = new Actor(this.newActor.id, this.newActor.name, this.newActor.description, this.newActor.imdb, this.newActor.images);
      actorTmdbID = this.newActor.themoviedb;
      this.actorService.getActorCredits(actorTmdbID).subscribe(creditResponse => {
        var prefix = "http://image.tmdb.org/t/p/w185/";
        newCredits = creditResponse;
        newCredits = JSON.parse(newCredits._body);
        this.credits = newCredits.cast.map(function(res){
          return {'id': res.id, 'title': res.title, 'imageUrl': prefix.concat(res.poster_path), 'character': res.character};
        });
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
