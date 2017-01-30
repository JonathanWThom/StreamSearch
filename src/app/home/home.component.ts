import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MovieService]
})
export class HomeComponent implements OnInit {
  allTopMovies;
  topMovies: Movie[] = [];

  constructor(public ms: MovieService) { }

  ngOnInit() {
    this.ms.getTopMovies().subscribe(x => {
      this.allTopMovies = x;
      this.allTopMovies = this.allTopMovies.results;
      for(var i=0; i < 4; i++) {
        this.topMovies.push(this.allTopMovies[i]);
      }
      console.log(this.topMovies);
    });
  }

}
