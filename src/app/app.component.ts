import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  user;
  constructor(private af: AngularFire, private us: UserService){
    this.us.checkForUser().subscribe(user => {
      this.user = user;
    })
  }
}
