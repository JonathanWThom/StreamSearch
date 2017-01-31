import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  providers: [MovieService]
})
export class MovieDetailComponent implements OnInit {
  movieApiDetails = {};
  movie: Movie;

  onNetflix: string = null;
  onHulu: string = null;
  onAmazon: string = null;
  onHbo: string = null;
  onItunes: string = null;



  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    var movieID;
    this.activatedRoute.params.forEach((urlParametersArray) => {
      movieID = urlParametersArray['id'];
    });

    this.movieService.getMovieDetails(movieID).subscribe(response => {
      this.movieApiDetails['details'] = response;
      this.movieApiDetails['details'] = JSON.parse(this.movieApiDetails['details']._body);
      var res = this.movieApiDetails['details'];
      this.movie = new Movie(res.title, res.id, res.release_year, res.in_theatres, res.release_date, res.rotten_tomatoes, res.metacritic, res.poster_small, res.poster_medium, res.poster_large, res.themoviedb, res.rating);
      this.movie.sources = res.subscription_web_sources;
      console.log(res);
      if(this.movie.sources) {
        for(var i = 0; i < this.movie.sources.length; i++) {
          if (this.movie.sources[i]['display_name'] === "Hulu") {
            this.onHulu = this.movie.sources[i]['link']
          } else if (this.movie.sources[i]['display_name'] === "Netflix") {
            this.onNetflix = this.movie.sources[i]['link']
          } else if (this.movie.sources[i]['display_name'] === "HBO NOW") {
            this.onHbo = this.movie.sources[i]['link']
          } else if (this.movie.sources[i]['display_name'] === "Amazon Prime") {
            this.onAmazon = this.movie.sources[i]['link']
          }
        }
      }

      this.movieService.getMovieImages(this.movie.themoviedb.toString()).subscribe(response => {
        this.movieApiDetails['images'] = response;
        this.movieApiDetails['images'] = JSON.parse(this.movieApiDetails['images']._body);
        this.movie.backdrop = this.movieService.backdropPrefix + this.movieApiDetails['images'].backdrop_path;
      })
      this.movieService.getMovieCast(movieID).subscribe(res => {
          this.movieApiDetails['cast'] = response;
          this.movieApiDetails['cast'] = JSON.parse(this.movieApiDetails['cast']._body);
          this.movie.cast = this.movieApiDetails['cast'].cast;
          console.log(this.movie.cast[0]['name'])
      })
    });
  }
  navigateToActorById(actorId: string){
    this.router.navigate(['actor', actorId]);
  }

}
