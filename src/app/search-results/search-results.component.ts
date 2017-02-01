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
  filter: string;
  itemsToDisplay = [];
  apiResults;
  parsedMovies = [];

  constructor(private route: ActivatedRoute, private router: Router, private ms: MovieService, private as: ActorService) { }

  ngOnInit() {
    console.log(this.itemsToDisplay);
    this.route.params.forEach((urlParameters) => {
      this.category = urlParameters['category'];
      this.term = urlParameters['term'];
      this.filter = urlParameters['filter'];

      if(this.category === "person"){
        this.as.getActorWithImages(this.term).subscribe(results => {
         this.apiResults = results;
         console.log(this.apiResults)
         this.itemsToDisplay = this.apiResults.results;
        })
      } else if (this.category === 'show') {
        this.ms.getResultsByTerm(this.category, this.term).subscribe(x => {
          this.apiResults = x;
          this.itemsToDisplay = this.apiResults.results;
        });
      } else {
        this.itemsToDisplay = [];
        this.ms.getResultsByTerm(this.category, this.term).subscribe(x => {
          this.apiResults = x;
          this.apiResults.results.forEach(movie => {
            this.ms.getMovieDetails(movie.id).subscribe(y => {
              this.parsedMovies.push(JSON.parse(y['_body']));
              if (this.filter === '') {
                this.itemsToDisplay = this.parsedMovies;
              } else {
                this.parsedMovies.forEach(movie => {
                  movie.subscription_web_sources.forEach(source => {
                    if (source.display_name === this.filter) {
                      console.log('you win');
                      this.itemsToDisplay.push(movie);
                    }
                  })
                })
              }
            });
          })
        })
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
