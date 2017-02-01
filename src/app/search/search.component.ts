import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchedCategory: string = 'movie';
  searchFilter: string = '';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  searchTerm(term) {
    this.router.navigate(['search', this.searchedCategory, term, this.searchFilter])
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
 addFilter(filter){
   this.searchFilter = filter
 }

 netflixActive(){}
 huluActive(){}
 amazonActive(){}
 hboActive(){}


}
