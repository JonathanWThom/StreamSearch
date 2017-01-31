import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MovieService]
})
export class HomeComponent implements OnInit {
  allTopMovies;
  topMovies: Movie[] = [];

  constructor(private ms: MovieService) { }

  ngOnInit() {
    this.ms.getTopMovies().subscribe(x => {
      this.allTopMovies = x;
      this.allTopMovies = this.allTopMovies.results;
      for(var i=0; i < 4; i++) {
        this.topMovies.push(this.allTopMovies[i]);
      }
    });
  }

}
