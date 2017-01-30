import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  providers: [MovieService]
})
export class SearchResultsComponent implements OnInit {

  category: string;
  term: string;
  itemsToDisplay;

  constructor(private route: ActivatedRoute, private ms: MovieService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.category = urlParameters['category'];
      this.term = urlParameters['term'];
    });
    this.ms.getResultsByTerm(this.category, this.term).subscribe(x => {
      this.itemsToDisplay = x;
      console.log(this.itemsToDisplay);
    });

  }

}
