import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchedCategory: string = 'movie';
  constructor(private router: Router) { }

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

}
