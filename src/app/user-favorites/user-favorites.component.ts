import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.css'],
  providers: [UserService]
})
export class UserFavoritesComponent implements OnInit {
  // @Input() fbUser: FirebaseListObservable<any[]>;
  user;
  fbUser;
  favoriteMovies;
  constructor(private us: UserService) {
    us.checkForUser().subscribe(user => {
      this.user = user;
      this.us.getUserFB(this.user).subscribe(fbUser => {
        this.fbUser = fbUser;
        this.favoriteMovies = this.fbUser.favoriteMovies;
        console.log(this.fbUser.favoriteMovies);
      });

    });
  }

  ngOnInit() {
    console.log(this.fbUser);
  }

}
