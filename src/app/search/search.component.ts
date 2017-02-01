import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchedCategory: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.forEach((urlParameters) => {
      console.log(urlParameters);
      if (urlParameters['category']) {
        this.searchedCategory = urlParameters['category'];
      } else {
        this.searchedCategory = 'movie';
      }
    });
    console.log(this.searchedCategory);
  }

  ngOnInit() {
  }

  searchTerm(term) {
    this.router.navigate(['search', this.searchedCategory, term])
  }

  addCategory(category) {
    this.searchedCategory = category;
 }

 movieActive() {
   if (this.searchedCategory === 'movie') {
     return 'active';
   } else {
     return 'inactive';
   }
 }

 tvActive() {
   if (this.searchedCategory === 'show') {
     return 'active';
   } else {
     return 'inactive';
   }
 }

 peopleActive() {
   if (this.searchedCategory === 'person') {
     return 'active';
   } else {
     return 'inactive';
   }
 }

}
