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
  itemsToDisplay: Object[] =[];
  apiResults;
  parsedMovies = [];
  foundMovies = [];

  constructor(private route: ActivatedRoute, private router: Router, private ms: MovieService, private as: ActorService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.itemsToDisplay.length = 0;
      this.foundMovies.length = 0;
      console.log(this.itemsToDisplay);
      this.category = urlParameters['category'];
      this.term = urlParameters['term'];
      this.filter = urlParameters['filter'];

      if(this.category === "person"){
        this.as.getActorWithImages(this.term).subscribe(results => {
         this.apiResults = results;
         this.itemsToDisplay = this.apiResults.results;
        })
      } else if (this.category === 'show') {
        this.ms.getResultsByTerm(this.category, this.term).subscribe(x => {
          this.apiResults = x;
          this.itemsToDisplay = this.apiResults.results;
        });
      } else {
        this.ms.getResultsByTerm(this.category, this.term).subscribe(x => {
          this.apiResults = x;
          this.apiResults.results.forEach(movie => {
            this.ms.getMovieDetails(movie.id).subscribe(y => {
              this.parsedMovies.push(JSON.parse(y['_body']));
              if (this.filter === '') {
                var unique = this.parsedMovies.filter(function(elem, index, self) {
                  return index == self.indexOf(elem);
                })
                this.itemsToDisplay = unique;
              } else {
                this.parsedMovies.forEach(movie => {
                  movie.subscription_web_sources.forEach(source => {
                    if (source.display_name === this.filter) {
                      this.foundMovies.push(movie);
                    }
                  })
                })
                var unique = this.foundMovies.filter(function(elem, index, self) {
                  return index == self.indexOf(elem);
                })
                this.itemsToDisplay = unique;
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
