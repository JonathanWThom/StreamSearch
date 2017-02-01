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

  constructor(private ms: MovieService, private router: Router) { }

  ngOnInit() {
    this.ms.getTopMovies().subscribe(x => {
      this.allTopMovies = x;
      this.allTopMovies = this.allTopMovies.results;
      for(var i=0; i < 4; i++) {
        this.topMovies.push(this.allTopMovies[i]);
      }
    });
  }
  getMovie(tmdbID: string): void{
        var foundMovie;
        this.ms.getMovieByTmdbID(tmdbID).subscribe(response => {
          foundMovie = response;
          foundMovie = JSON.parse(foundMovie._body);
          if(Object.keys(foundMovie).length === 0){
            alert('No streaming data available for this film. Try another.')
          } else {
            this.router.navigate(['movie', foundMovie.id]);
          }
        })
      }
}
