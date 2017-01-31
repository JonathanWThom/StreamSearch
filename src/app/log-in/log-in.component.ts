import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  providers: [UserService]
})
export class LogInComponent implements OnInit {
user = null;
fbUser;
  constructor(public af: AngularFire, private us: UserService) {
    us.checkForUser().subscribe(user => {
      this.user = user;
      this.fbUser = this.us.getUserFB(this.user);
    });
   }

  ngOnInit() {
  }

  login() {
    this.us.login().then(promise => {
      this.us.findOrMakeUser(this.user);
    });
  }

  logout() {
    this.us.logout();
    this.user = null;
  }
}
