import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchedCategory: string;
  constructor() { }

  ngOnInit() {
  }

  searchTerm(term) {
    console.log(term);
    console.log(this.searchedCategory);
    ///service call here
    // reroute to individual move component
  }

  addCategory(category) {
    this.searchedCategory = category;
 }

 movieActive() {
   if (this.searchedCategory === 'Movie') {
     return 'active';
   } else {
     return 'inactive';
   }
 }

 tvActive() {
   if (this.searchedCategory === 'TV') {
     return 'active';
   } else {
     return 'inactive';
   }
 }

}
