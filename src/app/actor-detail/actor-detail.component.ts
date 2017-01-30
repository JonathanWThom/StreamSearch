import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Actor } from '../actor.model';
import { Movie } from '../movie.model';

import { ActorService } from '../actor.service';


@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css'],
  providers: [ ActorService]
})
export class ActorDetailComponent implements OnInit {
  actor: Actor;
  newActor;
  credits: Movie[];

  constructor(private actorService: ActorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let actorID: string;
    var newCredits;
    this.activatedRoute.params.forEach((urlParametersArray) => {
      actorID = urlParametersArray['id'];
    })
    this.actorService.getActorDetails(actorID).subscribe(response => {
      this.newActor = response;
      this.newActor = JSON.parse(this.newActor._body);
      this.actor = new Actor(this.newActor.id, this.newActor.name, this.newActor.description, this.newActor.imdb, this.newActor.images);
    })
    this.actorService.getActorCredits(actorID).subscribe(response => {
      newCredits = response;
      newCredits = JSON.parse(newCredits._body);
      this.credits = newCredits.results.map(function(res){
        return new Movie(res.title, res.id, res.release_year, res.in_theatres, res.release_date, res.rotten_tomatoes, res.metacritic, res.poster_120x171, res.poster_240x342, res.poster_400x570, res.themoviedb, res.rating);
      });
    })
  }
}
