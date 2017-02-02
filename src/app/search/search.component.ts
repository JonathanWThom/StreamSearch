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
  searchFilterArray: string[] =[]
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
    this.router.navigate(['search', this.searchedCategory, term, this.searchFilterArray.join()])
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
     this.searchFilter = '';
     this.searchFilterArray.length = 0;

     return 'active';
   } else {
     return 'inactive';
   }
 }

 peopleActive() {
   if (this.searchedCategory === 'person') {
     this.searchFilter = '';
     this.searchFilterArray.length = 0;

     return 'active';
   } else {
     return 'inactive';
   }
 }
 addFilter(filter){
   if (this.searchFilter === filter) {
     this.searchFilter = '';
   } else {
     this.searchFilter = filter
   }
 }
 addToSearchFilterArray(filter){
   if (this.searchFilterArray.indexOf(filter)>= 0){
     this.searchFilterArray.splice(this.searchFilterArray.indexOf(filter), 1)
   } else {
   this.searchFilterArray.push(filter)
  }
 }

// changed each method to test for presence in the array
 netflixActive(){
   if (this.searchFilterArray.indexOf('Netflix')>= 0) {
     return 'active'
   } else {
     return 'inactive'
   }
 }

 huluActive(){
   if (this.searchFilterArray.indexOf('Hulu')>= 0) {
     return 'active'
   } else {
     return 'inactive'
   }
 }

 amazonActive(){
   if (this.searchFilterArray.indexOf('Amazon Prime')>= 0) {
     return 'active'
   } else {
     return 'inactive'
   }
 }

 hboActive(){
   if (this.searchFilterArray.indexOf('HBO NOW')>= 0) {
     return 'active'
   } else {
     return 'inactive'
   }
 }
}
