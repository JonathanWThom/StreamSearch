import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MovieService } from '../movie.service';
import { ActorService } from '../actor.service';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  providers: [MovieService, ActorService]
})
export class SearchResultsComponent implements OnInit {

  category: string;
  term: string;
  itemsToDisplay = [];
  apiResults;

  constructor(private route: ActivatedRoute, private router: Router, private ms: MovieService, private as: ActorService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.category = urlParameters['category'];
      this.term = urlParameters['term'];

      if(this.category === "person"){
        this.as.getActorWithImages(this.term).subscribe(results => {
         this.apiResults = results;
         console.log(this.apiResults)
         this.itemsToDisplay = this.apiResults.results;
        })
      } else {
        this.ms.getResultsByTerm(this.category, this.term).subscribe(x => {
          this.apiResults = x;
          this.itemsToDisplay = this.apiResults.results;

        });
      }
    });
  }

  goToPage(id) {
    id = id.toString();
    this.router.navigate([this.category, id]);
  }

  goToPersonPage(id) {
    id = id.toString();
    this.router.navigate([this.category, id]);
  }

}
