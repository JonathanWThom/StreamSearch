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
  constructor(public af: AngularFire, private us: UserService) {
    this.af.auth.subscribe(user => {
      if(user) {
        this.user = user;
        ///check to see if user already exists with service
        // ;
      } else {
        //user not logged in
        this.user = null;
      }
    })
   }

  ngOnInit() {
    console.log(this.user);
  }

  login() {
    var loginReturn = this.us.login();
    // console.log('in log in' + this.user);
    this.us.findOrMakeUser(this.user);
    console.log(this.user);
  }

  logout() {
    this.us.logout();
  }
}
