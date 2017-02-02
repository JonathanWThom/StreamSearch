import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchedCategory: string;
  searchFilter: string = '';
  showFilters: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.forEach((urlParameters) => {
      if (urlParameters['category']) {
        this.searchedCategory = urlParameters['category'];
      } else {
        this.searchedCategory = 'movie';
      }
    });
  }

  ngOnInit() {
  }

  searchTerm(term) {
    this.router.navigate(['search', this.searchedCategory, term, this.searchFilter])
  }

  addCategory(category) {
    this.searchedCategory = category;
    if (this.searchedCategory === 'movie') {
      this.showFilters = true;
    } else {
      this.showFilters = false;
    }
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
 addFilter(filter){
   if (this.searchFilter === filter) {
     this.searchFilter = ''
   } else {
     this.searchFilter = filter
   }
 }

 netflixActive(){
   if (this.searchFilter === 'Netflix') {
     return 'active'
   } else {
     return 'inactive'
   }
 }

 huluActive(){
   if (this.searchFilter === 'Hulu') {
     return 'active'
   } else {
     return 'inactive'
   }
 }

 amazonActive(){
   if (this.searchFilter === 'Amazon Prime') {
     return 'active'
   } else {
     return 'inactive'
   }
 }

 hboActive(){
   if (this.searchFilter === 'HBO NOW') {
     return 'active'
   } else {
     return 'inactive'
   }
 }


}
