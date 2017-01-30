import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MovieService]
})
export class HomeComponent implements OnInit {

  constructor(public ms: MovieService) { }

  ngOnInit() {
    this.ms.getTopMovies().subscribe(x => {
      console.log(x);
    })
  }

}
